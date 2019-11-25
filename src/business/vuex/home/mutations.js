/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
export default {
  // iosH5 新增
  // 初始化栏目资源信息
  COLRES_INIT(state, data) {
    state.colRes = data;
  },
  CLASS_INIT(state, data) {
    state.class = data;
  },
  RING_GET(state, data) {
    state.ring = data;
  },
  // // 获取搜索热词
  // SKW_GET(state, data) {
  //   state.searchSkw = data;
  // },
  // 查询栏目下合辑
  COMPLIATIONRES(state, data) {
    state.compilationRes = data.data;
  },
  // 首页向下滑动请求资源
  LISTRES(state, data) {
    state.listRes.rings = data;
  },
  // 分类向下滑动请求资源
  CLASSLISTRES(state, data) {
    state.classlistRes.rings = data;
  },
  // 轮播图下向下滑动请求资源
  SWIPERLISTRES(state, data) {
    state.swiperlistRes.rings = data;
  },
  // 查询首页轮播图下合辑
  SWIPERRING(state, data) {
    state.swiperring = data;
  },
  // 将资源重置为初始状态
  RINGRESET(state) {
    state.colRes = null;
    state.compilationRes = {};
    state.swiperring = {};
  },
  // 获取banner图target
  SWIPERTARGET(state, target) {
    state.swipertarget = target;
  },
  // 获取分类下id,target
  CLASSTARGET(state, { id, target }) {
    state.classid = id;
    state.classtarget = target;
  },
  // 控制铃音列表最底部空白
  ISPLAYER(state) {
    state.isPlayer = true;
  },
  EMPTYSWIPERLISTRES(state) {
    state.swiperlistRes = {};
  },
  EMPTYCLASSLISTRES(state) {
    state.classlistRes = {};
  },
  UPDATE_SELECT_CLASSIFY(state, { itemTopic, item }) {
    state.selectClassify = `${item.name}-${itemTopic.name}`;
  },
};
