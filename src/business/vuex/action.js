import { getUser, qryCurrentUser } from '@ring-order/sdk';
import { LoadStatus, StatType } from '../constant';
import {
  UPDATE_CHANNEL_CONFIG,
  UPDATE_CURRENT_RING,
  UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER,
  UPDATE_QRY_CUR_USER_STATUS,
} from './mutation-types';
import { setDefaultParams } from '../api/ajax';
import { statRingListen, statSetRing, ringProto, pageProto } from '../statistic/index';

export const actions = {
  // 初始化渠道配置信息
  initChannelConfig({ commit }) {
    // 用handlebar做了下服务端渲染，直接将渠道配置信息写进全局变量里面
    const { channel, config } = window.globalChannelConfig;
    commit(UPDATE_CHANNEL_CONFIG, {
      channel,
      config,
    });
    // 设置所有请求的默认参数
    const { cn, an, pi, v } = channel;
    setDefaultParams({
      cn,
      an,
      pi,
      v,
    });
  },
  // 统计埋点
  statistics({ state }, { type, page, index }) {
    const { currentRing } = state;
    const ringInfo = ringProto(currentRing);
    const pageInfo = pageProto(page, state);
    const ringStatistisc = Object.assign({}, ringInfo, pageInfo, { d_sortno: index.toString() });
    switch (type) {
      case StatType.ListenRing:
        statRingListen(ringStatistisc);
        break;
      case StatType.SetRing:
        statSetRing(ringStatistisc);
        break;
      default:
        break;
    }
  },
  // 查询当前用户
  qryCurUser({ commit, state }, { id, token }) {
    if (state.qryCurUserStatus === LoadStatus.Loading) {
      return;
    }
    commit(UPDATE_QRY_CUR_USER_STATUS, LoadStatus.Loading);
    // @ts-ignore sdk promise类型声明有冲突，导致ts检测不过，这里先忽略掉
    qryCurrentUser(id, token)
      .then(({ ring }) => {
        commit(UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER, getUser());
        commit(UPDATE_CURRENT_RING, ring);
        commit(UPDATE_QRY_CUR_USER_STATUS, LoadStatus.Success);

        // 查询用户信息成功刷新资源
        // if (phone) {
        //   dispatch('resetStatus');
        // }
      })
      .catch(() => {
        commit(UPDATE_QRY_CUR_USER_STATUS, LoadStatus.Error);
      });
  },

  // 更新当前铃音
  updateCurrentRing({ commit }, ring) {
    commit(UPDATE_CURRENT_RING, ring);
  },

  // 登录成功后刷新资源
  resetStatus({ commit, dispatch, state }) {
    commit('RESET_STATUS');
    console.log('state.cachedPage', state.cachedPage);
    switch (state.cachedPage) {
      case 'home':
        dispatch('home/qryCols');
        break;
      case 'classify':
        dispatch('home/qryClass');
        break;
      case 'search':
        dispatch('search/SEARCH', state.search.searchWords);
        break;
      case 'classifyrings':
        dispatch('home/qryColRes', state.home.classtarget);
        break;
      default:
        break;
    }
  },
};
