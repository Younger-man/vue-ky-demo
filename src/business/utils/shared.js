import { ApiRetCode } from '@ring-order/lib/constant/retcode';
import {
  init,
  qryCaptchaUrl,
  setOpenRingConfirm,
  setOrderVipConfirm,
  setOrderColorRingConfirm,
  isLoginUser,
  setApplePayForVipConfirm,
} from '@ring-order/sdk';
import { DiyStatus } from '@ring-order/lib/constant/status';
import { UserRights } from '@ring-order/lib/constant/rights';
import { LoadStatus, OrderCodeType, CommonSwitch } from '../constant';
import { cached, isEmpty } from './base';
// sdk返回码和订购状态之间的映射关系
export const apiCode2OrderStateMap = {
  // 二次确认取消
  [ApiRetCode.OPEN_RING_CONFIRM_CANCEL]: OrderCodeType.OpenRingConfirmCancel,
  [ApiRetCode.ORDER_VIP_CONFIRM_CANCEL]: OrderCodeType.OpenDiyConfirmCancel,
  [ApiRetCode.ORDER_COLOR_RING_CONFIRM_CANCEL]: OrderCodeType.OrderColorRingConfirmCancel,

  // 成功
  [ApiRetCode.SUCCESS]: LoadStatus.Success,

  // 订购过滤场景
  [ApiRetCode.NOT_SUPPORT_OPEN_RING]: OrderCodeType.NotSupportOpenRing,
  [ApiRetCode.NOT_SUPPORT_OPEN_DIY]: OrderCodeType.NotSupportOpenDiy,
  [ApiRetCode.NOT_SUPPORT_SET_RING]: OrderCodeType.NotSupportSetRing,
  [ApiRetCode.RING_NOT_SUPPORT_SET]: OrderCodeType.RingNotSupportSet,
  [ApiRetCode.REQUEST_ACCEPTED]: OrderCodeType.RequestAccepted,
  [ApiRetCode.CANCEL_ORDER_BY_WEBJS]: OrderCodeType.CancelOrderByWebjs,
};

// 订购sdk初始化
export function ordersdkInit({ channel, containerId = 'parentFrame', orderConfirmCallbacks }) {
  const { cn, pi, v, an } = channel;
  init(cn, pi, containerId, v, an, orderConfirmCallbacks);
}

export function validPhone(phone) {
  if (!phone) {
    return false;
  }
  return /^1\d{10}$/.test(phone);
}

export function validCaptcha(val, captchaLen = 4) {
  if (!val) {
    return false;
  }
  return val.length === captchaLen;
}

export function validSmsCode(val) {
  if (!val) {
    return false;
  }
  return /^\d{4,6}$/.test(val);
}

// 计算综合权益
export function getUserOrOpRights(user) {
  const { status, node } = user;
  if (status && status.diyStatus === DiyStatus.Opened) {
    return status.rights;
  }
  return (node && node.rights) || '';
}

// 是否需要订购2元版权
export function shouldOrderCopy(user, ring) {
  if (!user || !ring) {
    return false;
  }
  const { node } = user;
  const { cap } = ring;
  const userOrOpRights = getUserOrOpRights(user);
  if (!node || !cap) {
    return false;
  }
  // 运营商仅支持个彩+铃音仅具有版权能力
  if (userOrOpRights === UserRights.Diy && cap.copyright && !cap.diy) {
    return true;
  }
  return false;
}

// 优先返回操作用户
export function getOpOrLoginUser({ operatingUser, loginedUser }) {
  if (isEmpty(operatingUser)) {
    return loginedUser;
  }
  return operatingUser;
}

export const getQueryString = cached(name => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
});

function getCidByFriend() {
  const reg = /friend\/(\w+)/;
  const result = window.location.href.match(reg);
  if (result) {
    return result[1];
  }
  return null;
}
// url约定：friend/{tp} | ?tp={tp}
// 从url上获取第三方渠道号
export function getCidFromUrl() {
  return getCidByFriend() || getQueryString('tp');
}
// url约定：friend/{tp} | ?tp={tp}
// 从url上获取铃音id
export function getRingIdFromUrl() {
  return getQueryString('wno');
}

// 拼接5位数的铃音能力
export function concatRingFns(cap) {
  if (!cap) {
    return '';
  }
  const { diy, copyright, download, listen, edit } = cap;
  return `${bool2CommonSwitch(edit)}
    ${bool2CommonSwitch(download)}
    ${bool2CommonSwitch(listen)}
    ${bool2CommonSwitch(copyright)}
    ${bool2CommonSwitch(diy)}
  `.replace(/\s/g, '');
}
function bool2CommonSwitch(bool) {
  return bool ? CommonSwitch.Yes : CommonSwitch.No;
}

export {
  qryCaptchaUrl,
  setOpenRingConfirm,
  setOrderVipConfirm,
  setOrderColorRingConfirm,
  isLoginUser,
  setApplePayForVipConfirm,
};

// 导出setApplePayForVipConfirm供ios客户端调用
window.ordersdk = {
  setApplePayForVipConfirm,
};

export function undefined2EmptyString(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      obj[key] = '';
    }
  });
}
export function isAjaxSuc(code) {
  return code === ApiRetCode.SUCCESS;
}
