import { RESCODE } from '@/business/constant';
import { qryRing, qryColres, qryCols } from '@/business/api';
import { getUserOrOpRights, ringListFilter } from '@/business/utils';

export default {
  searchRing(content, id) {
    qryRing({ id }).then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        content.commit('RING_GET', data.modal);
      }
    });
    // .catch(e => {
    //   // //console.log('e', e);
    // });
  },
  // 查询分类栏目下合辑
  qryColRes(content, id) {
    qryColres({ id }).then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        content.commit('COMPLIATIONRES', data);
      }
    });
    // .catch(e => {
    //   // //console.log('e', e);
    // });
  },

  // 首页向下滑动请求资源
  qryListRes(content, { id, px, ps }) {
    qryColres({ id, px, ps }).then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        const userOrOpRights = getUserOrOpRights(content.rootState.loginedUser);
        if (content.state.listRes.rings === undefined) {
          content.state.listRes = data.data;
        } else {
          const oldRingList = content.getters.colResRing.rings.concat(content.state.listRes.rings || []);
          const newRingList = data.data.rings;
          data = content.state.listRes.rings.concat(ringListFilter(userOrOpRights, oldRingList, newRingList));
          content.commit('LISTRES', data);
        }
      }
    });
    // .catch(e => {
    //   // //console.log('e', e);
    // });
  },
  // 分类向下滑动请求资源
  qryClassListRes(content, { id, px, ps }) {
    qryColres({ id, px, ps }).then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        const userOrOpRights = getUserOrOpRights(content.rootState.loginedUser);
        if (content.state.classlistRes.rings === undefined) {
          content.state.classlistRes = data.data;
        } else {
          const oldRingList = content.getters.compilationRes.concat(content.state.classlistRes.rings || []);
          const newRingList = data.data.rings;
          data = content.state.classlistRes.rings.concat(ringListFilter(userOrOpRights, oldRingList, newRingList));
          content.commit('CLASSLISTRES', data);
        }
      }
    });
    // .catch(e => {
    //   // console.log('e', e);
    // });
  },

  // 轮播图下向下滑动请求资源
  qryswiperlistRes(content, { id, px, ps }) {
    qryColres({ id, px, ps }).then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        const userOrOpRights = getUserOrOpRights(content.rootState.loginedUser);
        if (content.state.swiperlistRes.rings === undefined) {
          content.state.swiperlistRes = data.data;
        } else {
          const oldRingList = content.getters.swiperring.concat(content.state.swiperlistRes.rings || []);
          const newRingList = data.data.rings;
          data = content.state.swiperlistRes.rings.concat(ringListFilter(userOrOpRights, oldRingList, newRingList));
          content.commit('SWIPERLISTRES', data);
        }
      }
    });
    // .catch(e => {
    //   console.log('e', e);
    // });
  },

  qryCols(content, id) {
    if (!id) {
      // eslint-disable-next-line
      id = content.rootState.channelConfig.config.id;
    }
    qryCols({ id }).then(colsData => {
      // //console.log('colsData', colsData);
      content.commit('COLRES_INIT', colsData.data.res);
      // if (colsData.data.res.cols.length === 3) {
      //   // 同时返回了分类资源
      //   content.commit('CLASS_INIT', colsData.data.res.cols[2]);
      // }
    });
  },

  qryClass(content) {
    const { classId } = content.rootState.channelConfig.config;
    qryCols({ id: classId }).then(classData => {
      // //console.log('colsData', colsData);
      content.commit('CLASS_INIT', classData.data.res);
    });
  },
  // 查询轮播图下合辑
  qrySwiperRing(content, id) {
    qryCols({ id }).then(data => {
      content.commit('SWIPERRING', data.data.res);
    });
  },
  // 将资源重置为初始状态
  ringreset(content) {
    content.commit('RINGRESET');
  },
};
