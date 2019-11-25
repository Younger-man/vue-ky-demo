import {
  UPDATE_CHANNEL_CONFIG,
  UPDATE_CURRENT_RING,
  UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER,
  UPDATE_OPERATING_USER,
  UPDATE_QRY_CUR_USER_STATUS,
  RESET_STATUS,
  CACHED_PAGE,
  UPDATESHOWPLAYER,
} from './mutation-types';

export const mutations = {
  // 更新当前操作铃音
  [UPDATE_CURRENT_RING](state, ring) {
    if (!ring || !ring.id) {
      return;
    }
    state.currentRing = ring;
  },
  // 更新登录用户，清空操作用户
  [UPDATE_LOGINED_USER_AND_CLEAR_OPERATING_USER](state, user) {
    if (user !== undefined) {
      state.loginedUser = user;
    }
    state.operatingUser = {};
  },
  // 更新操作用户信息
  [UPDATE_OPERATING_USER](state, user) {
    state.operatingUser = user;
  },
  // 更新查询用户信息状态
  [UPDATE_QRY_CUR_USER_STATUS](state, status) {
    state.qryCurUserStatus = status;
  },
  // 更新渠道配置
  [UPDATE_CHANNEL_CONFIG](state, { channel, config }) {
    state.channelConfig.channel = channel;
    // config某些key node层没返回时候直接使用默认值
    state.channelConfig.config = {
      ...state.channelConfig.config,
      ...config,
    };
  },
  // 需要缓存的页面
  [CACHED_PAGE](state, data) {
    state.cachedPage = data;
  },
  // 重置状态
  [RESET_STATUS](state) {
    state.home.colRes = {};
    state.home.ring = null;
    state.home.class = null;
    state.home.compilationRes = {};
    state.home.swiperring = {};
    state.home.listRes = {};
    // search
    state.search.noSearchRes = null;
    state.search.searchRes = null;
    state.search.more = '0';
    state.search.px = '0';
  },
  [UPDATESHOWPLAYER](state, data) {
    state.isShowPlayer = data;
  },
};
