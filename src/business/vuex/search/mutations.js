import Vue from 'vue';
import { getUserOrOpRights } from '../../utils/shared';
import { ringListFilter } from '../../utils/resources';
import { MSG } from '../../constant';
// import store from "../index";

/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
export default {
  SEARCH_GET(state, data) {
    state.searchRes = data.rings;
    state.searchRes = ringListFilter(getUserOrOpRights(this.state.loginedUser), [], state.searchRes);
    state.noSearchShow = false;
    state.more = data.more;
    state.px = data.next || 0;
  },
  SEARCH_MORE(state, data) {
    state.noSearchShow = false;
    // 去重
    // //console.log('state.res', ringListFilter(getUserOrOpRights({}),state.searchRes,data.rings));
    const filterData = ringListFilter(getUserOrOpRights(this.state.loginedUser), state.searchRes, data.rings);
    if (filterData.length === 0) {
      Vue.prototype.$promptTip('app', {
        content: MSG.NO_MORE,
      });
      return;
    }
    state.searchRes = [...state.searchRes, ...filterData];
    // state.searchRes.forEach(function(item, i, arr))
    state.more = data.more;
    state.px = data.next || state.px + 1;
  },
  SEARCH_RESET(state) {
    state.searchRes = [];
    state.more = 'false';
    state.px = 0;
    state.noSearchShow = true;
  },
  // 获取搜索热词
  SKW_GET(state, data) {
    state.searchSkw = data;
  },
  SEARCH_ORIGIN(state) {
    state.searchRes = [];
    state.more = 'false';
    state.searchWords = '';
    state.px = 0;
    state.noSearchShow = false;
  },
  // 初始化历史jilu
  HISTORY(state) {
    const history = window.localStorage.getItem(`${window.env}-search-history`);
    // TODO
    if (history && JSON.parse(history).length > 12) {
      state.history = JSON.parse(history).slice(0, 12);
    } else if (history && JSON.parse(history).length <= 12) {
      state.history = JSON.parse(history);
    } else {
      state.history = [];
    }
  },
  UPDATE_HISTORY(state, data) {
    const index = state.history.indexOf(data);
    // //console.log('history', index);
    if (index === -1) {
      state.history.unshift(data);
    } else {
      state.history.splice(index, 1);
      state.history.unshift(data);
    }
    if (state.history.length > 12) {
      state.history = state.history.slice(0, 12);
    }
    window.localStorage.setItem(`${window.env}-search-history`, JSON.stringify(state.history));
  },
  CLEAR_HISTORY(state) {
    state.history = [];
    window.localStorage.removeItem(`${window.env}-search-history`);
  },
  UPDATE_WORD(state, data) {
    state.searchWords = data;
  },
  NO_SEARCH_INIT(state, data) {
    data.cols.forEach(element => {
      // TODO
      if (element.type === '20020002') {
        state.noSearchRes = element.rings;
      }
    });
  },
};
