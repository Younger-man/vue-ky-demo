import { ApiRetCode } from '@ring-order/lib/constant/retcode';
import { getUser, isLoginUser, order, sendSmsCode, smsLogin, getBaseStatObj } from '@ring-order/sdk';
import { RingStatus, DiyStatus } from '@ring-order/lib/constant/status';
import { OrderType } from '@ring-order/lib/constant/types';
import { GetSmsCodeType, LoadStatus, OrderCodeType } from '../../constant';
import { apiCode2OrderStateMap, shouldOrderCopy } from '../../utils';
import { statOrderFilter } from '../../statistic/index';
import {
  UPDATE_CURRENT_RING,
  UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER,
  UPDATE_OPERATING_USER,
} from '../mutation-types';
import { UPDATE_GET_SMS_CODE_STATE, UPDATE_LOGIN_STATE, UPDATE_ORDER_STATE } from './mutation-types';
import { createDefaultState } from './state';
import { syncLoginPhone } from '@/business/extapi';

export const actions = {
  // 获取短信验证码
  getSmsCode({ commit, state }, { phone, captcha, id, option }) {
    if (state.getSmsCodeState.status === LoadStatus.Loading) {
      return;
    }
    commit(UPDATE_GET_SMS_CODE_STATE, { status: LoadStatus.Loading });

    sendSmsCode(phone, captcha, id, option)
      .then(({ code, ring }) => {
        commit(UPDATE_GET_SMS_CODE_STATE, { status: LoadStatus.Success });
        // 更新当前铃音
        commit(UPDATE_CURRENT_RING, ring, { root: true });

        // 铃音不存在也允许继续登录
        if (code !== ApiRetCode.SUCCESS && code !== ApiRetCode.RING_NOT_EXIST) {
          switch (code) {
            // 需要图形验证码
            case ApiRetCode.CAPTCHA_REQUIRED:
              commit(UPDATE_GET_SMS_CODE_STATE, {
                status: GetSmsCodeType.RequireCaptcha,
                shouldShowCaptcha: true,
                captchaVerified: false,
              });
              break;
            // 图形验证码错误
            case ApiRetCode.CAPTCHA_ERROR:
              commit(UPDATE_GET_SMS_CODE_STATE, {
                status: GetSmsCodeType.CaptchaError,
                shouldShowCaptcha: true,
                captchaVerified: false,
              });
              break;
            default:
              // 其他错误直接丢给页面处理
              commit(UPDATE_GET_SMS_CODE_STATE, { status: code, shouldConvertStatus2Tip: true });
          }
          // 图形验证码验证通过但是短信下发失败
          if (isCaptchaVerified({ code, captcha })) {
            commit(UPDATE_GET_SMS_CODE_STATE, { captchaVerified: true });
          }
          return;
        }
        // 获取验证码成功后更新操作用户信息
        commit(UPDATE_OPERATING_USER, getUser(), { root: true });
        commit(UPDATE_GET_SMS_CODE_STATE, {
          code: LoadStatus.Success,
          captchaVerified: isCaptchaVerified({ code, captcha }),
          shouldShowCountDown: true,
        });
      })
      .catch(() => {
        commit(UPDATE_GET_SMS_CODE_STATE, LoadStatus.Error);
      });
  },

  // 更新获取验证码状态
  updateGetSmsCodeState({ commit }, params) {
    commit(UPDATE_GET_SMS_CODE_STATE, params);
  },

  // 登录
  login({ commit, state, dispatch }, { phone, code, id, option }) {
    if (state.loginState === LoadStatus.Loading) {
      return;
    }
    commit(UPDATE_LOGIN_STATE, LoadStatus.Loading);

    smsLogin(phone, code, id, option)
      .then(({ code }) => {
        // 这里之所以不用返回码来判断是因为登录成功并不一定返回0000，
        // 也有可能返回铃音不存在等其他异常返回码，这里直接通过sdk接口判断是否登录成功
        if (!isLoginUser(phone)) {
          commit(UPDATE_LOGIN_STATE, code);
          return;
        }

        // 将号码同步给客户端
        syncLoginPhone(phone);

        // 登录成功后重设资源页状态，刷新进入页资源
        dispatch('resetStatus', {}, { root: true });
        commit(UPDATE_LOGIN_STATE, LoadStatus.Success);
        commit(UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER, getUser(), { root: true });

        // 传入铃音id的情况下登录成功直接走订购流程
        if (id !== undefined) {
          dispatch('order', { phone, id });
        }
      })
      .catch(() => {
        commit(UPDATE_LOGIN_STATE, LoadStatus.Error);
      });
  },

  // 订购
  order(
    {
      commit,
      state,
      rootState: { loginedUser, currentRing },
    },
    { phone, id, title, url },
  ) {
    if (state.orderState.status === LoadStatus.Loading) {
      return;
    }
    commit(UPDATE_ORDER_STATE, { status: LoadStatus.Loading });

    const checkResult = checkBeforeOrder({ user: loginedUser, ring: currentRing });
    // 订购过滤统计埋点
    sendStatOrderFilter(checkResult, currentRing);
    if (checkResult !== true) {
      commit(UPDATE_ORDER_STATE, { status: checkResult });
      return;
    }

    order(phone, id, title, url)
      .then(({ code, result = {} }) => {
        // 更新登录用户（订购之后权益信息会发生改变，这里从sdk更新下）
        commit(UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER, getUser(), { root: true });
        // 映射返回码
        commit(UPDATE_ORDER_STATE, {
          status: apiCode2OrderStateMap[code] || code,
          result,
        });
      })
      .catch(() => {
        commit(UPDATE_ORDER_STATE, { status: LoadStatus.Error });
      });
  },

  // 重置登录模块状态
  reset({ commit }) {
    const defaultLoginState = createDefaultState();
    commit(UPDATE_GET_SMS_CODE_STATE, defaultLoginState.getSmsCodeState);
    commit(UPDATE_ORDER_STATE, defaultLoginState.orderState);
    commit(UPDATE_LOGIN_STATE, defaultLoginState.loginState);
  },

  resetOrderState({ commit }) {
    const defaultLoginState = createDefaultState();
    commit(UPDATE_ORDER_STATE, defaultLoginState.orderState);
  },
};

// 图形验证码验证通过
function isCaptchaVerified({ code, captcha }) {
  return captcha && code !== ApiRetCode.CAPTCHA_ERROR;
}

// 由于ios不允许苹果支付之外的支付方式，这里过滤下需要走到非苹果支付的场景
function checkBeforeOrder({ user, ring }) {
  const { status, node } = user;

  // 彩铃或业务状态未知
  if (
    !status ||
    !status.ringStatus ||
    status.ringStatus === RingStatus.Unknown ||
    !status.diyStatus ||
    status.diyStatus === DiyStatus.Unknown
  ) {
    return OrderCodeType.UnknownRingOrDiyStatus;
  }

  // 非彩铃
  if (status.ringStatus !== RingStatus.Opened) {
    return OrderCodeType.NotRing;
  }

  // 用户非vip+业务开通方式非苹果支付
  if (status.diyStatus !== DiyStatus.Opened && (!node || node.diyOn !== OrderType.ApplePay)) {
    return OrderCodeType.diyOnNotApplePay;
  }

  // 需要订购版权铃音
  if (shouldOrderCopy(user, ring)) {
    return OrderCodeType.ShouldOrderCopy;
  }

  // 避免在未传入铃音id的情况下帮用户开了业务引起投诉
  if (!ring || !ring.id) {
    return OrderCodeType.RingNotExist;
  }

  return true;
}
// 订购过滤统计埋点 获取基础参数以及原因
function sendStatOrderFilter(reason, ring) {
  const reasonMap = {
    RingNotExist: 'ringoff',
    ShouldOrderCopy: 'copynotsupport',
    diyOnNotApplePay: 'opennotios',
    NotRing: 'notring',
    UnknownRingOrDiyStatus: 'unknownstatus',
  };

  const { id, title, tfns } = ring;
  const statObj = Object.assign({ d_reason: reasonMap[reason] }, getBaseStatObj(), {
    d_ringno: id,
    d_ringname: title,
    i_ringfns: tfns,
  });
  statOrderFilter(statObj);
}
