import { OperatorType, OrderResult } from '@ring-order/lib/constant/types';
import { LoadStatus, OrderCodeType, SetResultType } from '../../constant';
import { computeWarmTips, getOpOrLoginUser, sdkcode2Tip } from '../../utils';

export const getters = {
  // 处理订购结果
  setResult(
    {
      orderState: { status, result = { ring: '', vip: '', task: '' } },
    },
    getters,
    {
      channelConfig: { config },
    },
  ) {
    const { vip, task } = result;
    switch (status) {
      case LoadStatus.Init:
      case LoadStatus.Loading:
        // do nothing
        return { type: SetResultType.Null, tips: '' };
      case OrderCodeType.OpenRingConfirmCancel:
      case OrderCodeType.OpenDiyConfirmCancel:
      case OrderCodeType.OrderColorRingConfirmCancel:
      case OrderCodeType.CancelOrderByWebjs:
        // do nothing
        return { type: SetResultType.Null, tips: '' };
      case LoadStatus.Success:
        // 管理系统仅支持一句话文案，产品希望标题+描述，这里直接写死
        return {
          type: SetResultType.Success,
          title: '彩铃订购成功',
          tips: '预计两小时生效，请耐心等待',
        };
      case OrderCodeType.diyOnNotApplePay:
        return { type: SetResultType.CheckFail, tips: config.sysErrorTip };
      case OrderCodeType.NotSupportOpenRing:
        return { type: SetResultType.CheckFail, tips: config.ringOff[getters.ct] };
      case OrderCodeType.NotSupportOpenDiy:
        return { type: SetResultType.CheckFail, tips: config.diyOff };
      case OrderCodeType.NotSupportSetRing:
        return { type: SetResultType.CheckFail, tips: config.setOff };
      case OrderCodeType.RingNotExist:
      case OrderCodeType.RingNotSupportSet:
        return { type: SetResultType.CheckFail, tips: config.ringCopyrightRiskTip };
      case OrderCodeType.NotRing:
        return { type: SetResultType.CheckFail, tips: config.notRingTip };
      case OrderCodeType.UnknownRingOrDiyStatus:
        return { type: SetResultType.CheckFail, tips: config.unknownRingOrDiyStatusTip };
      case OrderCodeType.ShouldOrderCopy:
        return { type: SetResultType.CheckFail, tips: config.notSupportOrderCopyTip };
      default: // 加个语句块避免变量提升
      {
        // 管理系统仅支持一句话文案，产品希望标题+描述，这里直接写死
        let tips = config.setDiyFailTip;
        let title = '设置失败';

        if (vip === OrderResult.Success && task === OrderResult.Fail) {
          title = '彩铃订购成功';
          tips = '但本次设置失败，请稍后重试';
        }
        return { type: SetResultType.SetFail, tips, title };
      }
    }
  },
  // 温馨提示信息
  warmTips(
    _state,
    _getters,
    {
      channelConfig: { config },
      operatingUser,
      loginedUser,
      currentRing,
    },
  ) {
    return computeWarmTips(config.warmTips, getOpOrLoginUser({ operatingUser, loginedUser }), currentRing);
  },
  // 运营商
  ct(_state, _getters, { operatingUser, loginedUser }) {
    const node = operatingUser.node || loginedUser.node;
    return (node && node.ct) || OperatorType.Mobile;
  },
  phoneErrorTip(
    {
      getSmsCodeState: { status, shouldConvertStatus2Tip },
    },
    _getters,
    {
      channelConfig: { config },
    },
  ) {
    if (shouldConvertStatus2Tip) {
      return sdkcode2Tip(status, config);
    }
    return '';
  },
  codeErrorTip(
    { loginState },
    _getters,
    {
      channelConfig: { config },
    },
  ) {
    if (loginState !== LoadStatus.Init && loginState !== LoadStatus.Loading && loginState !== LoadStatus.Success) {
      return sdkcode2Tip(loginState, config);
    }
    return '';
  },
};
