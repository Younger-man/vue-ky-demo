import actions from './action';
import mutations from './mutations';
import { getters } from './getters';

const search = {
  namespaced: true,
  state: {
    noSearchRes: null, // 查询无结果时推荐资源
    searchRes: null, // 搜索资源
    more: '0', // 是否还有更多， 0表示没有
    px: '0', // 页码
    searchSkw: [], // 搜索热词
    searchWords: '',
    noSearchShow: false,
    history: [], // 历史记录
  },
  actions,
  mutations,
  getters,
};

export default search;
