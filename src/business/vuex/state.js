import { LoadStatus } from '../constant';

export const state = {
  // 查询当前用户状态
  qryCurUserStatus: LoadStatus.Init,
  // 登录用户
  loginedUser: {},
  // 操作用户
  operatingUser: {},
  // 当前操作铃音
  currentRing: {},
  // 渠道配置信息
  channelConfig: {
    channel: {
      cn: '9041',
      id: 'c1c250db803b364f',
      pi: '002',
      an: 'HACS171',
      v: '1.0.00',
    },
    config: {
      smsInterval: 60,
      diyOff: '很抱歉，您所在的省份暂不支持此功能。',
      ringOff: {
        1: '抱歉，您的号码不支持直接开通彩铃，请联系运营商12530222咨询开通。',
        2: '抱歉，您的号码不支持直接开通彩铃，请联系运营商10010咨询开通。',
        3: '抱歉，您的号码不支持直接开通彩铃，请联系运营商10000咨询开通。',
      },
      setOff: '你的号码归属地不支持彩铃业务',
      warmTips: {
        notvipCommon:
          '1.设置本首彩铃需要开通个性化彩铃服务（5元/月），开通后可免费不限次数的更换所有彩铃。2.个性化彩铃服务需开通彩铃功能，3-5元/月，由运营商收取。若您未开通，我们将一并为您开通；若您已开通，请忽略此项。3.取消上述服务需拨打运营商服务号，当月取消，次月生效；不取消则默认继续包月使用此服务。',
        orderringRingtip: '*设置本彩铃，需要#price#元，有效期#expirydate#；',
        orderringCommon: '',
      },
      diyConfim: {
        1: '开通后可以免费更换所有彩铃，包月费用由运营商收取。',
        2: '开通后可以免费更换所有彩铃，包月费用由运营商收取。',
        3: '开通后可以免费更换所有彩铃，包月费用由运营商收取。',
        title: '你即将开通个性彩铃包月',
      },
      ringConfirm: {
        title: '确认要开通彩铃功能（5元/月）吗？',
        1: '',
        2: '',
        3: '',
      },
      copyrightConfirm: '确认订购版权铃声, 2元/首？',
      faq: [
        {
          q: '1. 什么是个性化彩铃服务？开通个性化彩铃服务可享受哪些权益？',
          a:
            '个性化彩铃服务，是运营商的一项增值业务；当您开通个性化彩铃服务后，在服务期限内，可免费、不限次数地更换本专区所有彩铃。',
        },
        {
          q: '2. 个性化彩铃服务如何收费？',
          a:
            '个性化彩铃服务按月收取费用5元/月，我们也会偶尔地的任性（5折）一下，心情太好的时候也会白！送！（嘘！千万别让老板知道…）',
        },
        {
          q: '3. 要成为个性化彩铃用户，需要符合什么条件？',
          a:
            '个性化彩铃服务是运营商的一项增值服务，只要您有彩铃功能，就能轻松地成为个性化彩铃用户。如果您没有，我们会顺便帮你开通，开通过程中可能需要您短信回复确认。当然也会出现开通失败的情况，万一被您遇着了，还请多担待。',
        },
        {
          q: '4. 如果关闭了彩铃功能，会不会导致个性化彩铃服务不能正常使用？',
          a: '会…',
        },
        {
          q: '5. 如何退订个性化彩铃服务？',
          a:
            '移动用户发送AQXDIY到10658830；电信用户发送TT到118100806；联通用户发送TT到1065515810000进行退订。相信你用不到的啦，嘿嘿。',
        },
      ],
      openRingSmsConfirmTip: '还差最后一步：请查收短信，按提示操作即可完成彩铃设置',
      openDiySmsConfirmTip: '还差最后一步：请查收短信，按提示操作即可完成彩铃设置',
      ringCopyrightRiskTip: '抱歉，该铃声因版权限制，无法设置您可以尝试设置其他铃声',
      setDiyFailTip: '很抱歉，设为彩铃失败，请重新操作！',
      openRingFailTip: '请稍后重新设置彩铃',
      smsCodeErrorTip: '验证码不对哦，检查一下再试吧',
      smsCodeExpiredTip: '验证码过期了，再获取一次吧',
      smsCodeOverUseTip: '同一验证码不能用太多次了哦',
      opUnknownTip: '查不到您号码的归属地',
      smsCodeOverGetTip: '验证次数超过限额，请明日再试',
      smsCodeOverErrorTip: '输错太多次啦，再获取一次吧',
      smsCodeMinIntervalTip: '请您#interval#后重新获取！',
      sysErrorTip: '很抱歉，系统繁忙，请您稍后再试',
      setDiySuccessTip: '提交设置成功，设置为默认彩铃后将短信通知你！',
      openRingSucAndSetFail: '您的彩铃已成功开通，但本次设置彩铃失败，请稍后再试！',
      openDiySucAndSetFail: '您的个性化彩铃已成功开通，但本次设置彩铃失败，请稍后再试！',
      cloudStatisticCode: '1daccb83e8694667a5504d67be109042',

      unknownRingOrDiyStatusTip: '获取用户信息失败',
      notRingTip: '未开通基础彩铃功能，无法开通业务',
      notSupportOrderCopyTip: '当前铃音不支持设置彩铃',
    },
  },
  // 需要被缓存的页面，登录之后重新拉去数据
  cachedPage: '',
  // 是否显示播放器
  isShowPlayer: false,
};
