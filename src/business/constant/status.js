// 通用接口状态
export const LoadStatus = {
  // 初始化(默认状态)
  Init: 'Init',
  // 加载中
  Loading: 'Loading',
  // 请求成功
  Success: 'Success',
  // 请求出错
  Error: 'Error',
  // 无结果
  NoResult: 'NoResult',
  // 没有下一页
  End: 'End',
};

// 获取验证码需要处理的返回码
export const GetSmsCodeType = {
  // 需要图形验证码
  RequireCaptcha: 'RequireCaptcha',
  // 图形验证码错误
  CaptchaError: 'CaptchaError',
  // 获取验证码小于最小间隔
  LessThanMinInterval: 'LessThanMinInterval',
  // 获取验证码达到最大次数
  ReachMaxGetTimes: 'ReachMaxGetTimes',
  // 超过最大失败次数
  ReachMaxFailTimes: 'ReachMaxFailTimes',
  // 运营点不存在
  OperateNodeNotExist: 'OperateNodeNotExist',
  // 通过webjs登录
  WebjsLogin: 'WebjsLogin',
};

// 登录需要处理的返回码
export const LoginCodeType = {
  // 验证码错误
  SmsCodeError: 'SmsCodeError',
  // 验证码过期
  SmsCodeExpired: 'SmsCodeExpired',
  // 验证码达到最大使用次数
  SmsCodeReachMaxUseTimes: 'SmsCodeReachMaxUseTimes',
  // 运营点不存在
  OperateNodeNotExist: 'OperateNodeNotExist',
  // 彩铃或业务状态未知
  UnknownRingOrDiyStatus: 'UnknownRingOrDiyStatus',
  // 铃音不存在
  RingNotExist: 'RingNotExist',
};

// 订购需要处理的返回码
export const OrderCodeType = {
  // 运营点不存在
  OperateNodeNotExist: 'OperateNodeNotExist',
  // 用户未登录
  UserNotLogin: 'UserNotLogin',
  // 彩铃或业务状态未知
  UnknownRingOrDiyStatus: 'UnknownRingOrDiyStatus',
  // 铃音不存在
  RingNotExist: 'RingNotExist',
  // 不支持开通彩铃
  NotSupportOpenRing: 'NotSupportOpenRing',
  // 不支持开通业务
  NotSupportOpenDiy: 'NotSupportOpenDiy',
  // 不支持设置彩铃
  NotSupportSetRing: 'NotSupportSetRing',
  // 当前彩铃不支持设置
  RingNotSupportSet: 'RingNotSupportSet',
  // 开彩铃需要用户短信确认
  OpenRingNeedSmsConfirm: 'OpenRingNeedSmsConfirm',
  // 开业务需要用户短信确认
  OpenDiyNeedSmsConfirm: 'OpenDiyNeedSmsConfirm',
  // 用户在webjs页面取消支付
  CancelOrderByWebjs: 'CancelOrderByWebjs',
  // 请求已受理
  RequestAccepted: 'RequestAccepted',
  // 开彩铃二次确认取消
  OpenRingConfirmCancel: 'OpenRingConfirmCancel',
  // 开业务二次确认取消
  OpenDiyConfirmCancel: 'OpenDiyConfirmCancel',
  // 订购版权铃音二次确认取消
  OrderColorRingConfirmCancel: 'OrderColorRingConfirmCancel',

  // 用户非彩铃
  NotRing: 'NotRing',
  // 需要订购版权铃音
  ShouldOrderCopy: 'ShouldOrderCopy',
  // 业务开通方式非苹果支付
  diyOnNotApplePay: 'diyOnNotApplePay',
};
