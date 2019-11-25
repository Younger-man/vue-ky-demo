import { ApiRetCode } from '@ring-order/lib/constant/retcode';
import { shouldOrderCopy } from './shared';
// sdk返回码转为业务端展示文案
export function sdkcode2Tip(code, config) {
  const map = {
    [ApiRetCode.SMS_CODE_LESS_THAN_MIN_INTERVAL]: config.smsCodeMinIntervalTip.replace(
      '#interval#',
      `${config.smsInterval}`,
    ),
    [ApiRetCode.SMS_CODE_REACH_MAX_GET_TIMES]: config.smsCodeOverGetTip,
    [ApiRetCode.SMS_CODE_REACH_MAX_FAIL_TIEMS]: config.smsCodeOverErrorTip,
    [ApiRetCode.SMS_CODE_ERROR]: config.smsCodeErrorTip,
    [ApiRetCode.SMS_CODE_EXPIRED]: config.smsCodeExpiredTip,
    [ApiRetCode.SMS_CODE_REACH_MAX_USE_TIMES]: config.smsCodeOverUseTip,
    [ApiRetCode.OPERATE_NODE_NOT_EXIST]: config.opUnknownTip,
    default: config.sysErrorTip,
  };
  return map[code] || map.default;
}
// 综合铃音信息，用户权益，运营点权益计算温馨提示信息
export function computeWarmTips(warmTips, user, ring) {
  const { notvipCommon, orderringRingtip, orderringCommon } = warmTips;
  const { node } = user;
  if (!node || !node.ct || !shouldOrderCopy(user, ring)) {
    return notvipCommon;
  }
  const { copyright } = ring;
  if (copyright && copyright[node.ct]) {
    const { price, deadline } = copyright[node.ct];
    return `${orderringRingtip
      .replace('#price#', formatPrice(price))
      .replace('#expirydate#', deadline)}<br/>${orderringCommon}`;
  }
  return notvipCommon;
}
// 格式化价格
function formatPrice(price) {
  const segements = `${price}`.split('.');
  if (segements[1] && parseInt(segements[1], 10) !== 0) {
    return segements.join('.');
  }
  return segements[0];
}
