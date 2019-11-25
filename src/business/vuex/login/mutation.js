import { UPDATE_GET_SMS_CODE_STATE, UPDATE_LOGIN_STATE, UPDATE_ORDER_STATE } from './mutation-types';

export const mutations = {
  // 获取验证码状态
  [UPDATE_GET_SMS_CODE_STATE](state, payload) {
    state.getSmsCodeState = {
      ...state.getSmsCodeState,
      ...payload,
    };
  },
  // 登录状态
  [UPDATE_LOGIN_STATE](state, status) {
    state.loginState = status;
  },
  // 订购状态
  [UPDATE_ORDER_STATE](state, payload) {
    state.orderState = {
      ...state.orderState,
      ...payload,
    };
  },
};
