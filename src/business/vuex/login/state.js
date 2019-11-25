import { LoadStatus } from '../../constant';

export function createDefaultState() {
  return {
    getSmsCodeState: {
      status: LoadStatus.Init,
      shouldShowCountDown: false,
      shouldShowCaptcha: false,
      shouldConvertStatus2Tip: false,
      captchaVerified: false,
    },
    loginState: LoadStatus.Init,
    orderState: {
      status: LoadStatus.Init,
    },
  };
}
export const state = createDefaultState();
