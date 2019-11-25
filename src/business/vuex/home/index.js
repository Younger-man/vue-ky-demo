import actions from './action';
import mutations from './mutations';
import getters from './getters';

const home = {
  namespaced: true,
  state: {
    colRes: {}, // 首页栏目资源
    classtarget: '', // 分类下target
    classid: '', // 分类下id
    swipertarget: '', // 轮播图target
    ring: null, // 铃音
    class: null, // 分类
    compilationRes: {}, // 合辑
    swiperring: {}, // 轮播图下合辑
    listRes: {}, // 首页向下滑动请求资源
    classlistRes: {}, // 分类向下滑动请求资源
    swiperlistRes: {}, // 轮播图下向下滑动请求资源
    // searchSkw: [], // 搜索热词
    isPlayer: false, // 控制底部空白处显示
    selectClassify: '', // 选择的分类tab 用于统计埋点
  },
  actions,
  mutations,
  getters,
};

export default home;
