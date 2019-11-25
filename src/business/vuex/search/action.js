import Vue from 'vue';
import { RESCODE, MSG } from '@/business/constant';
import { search, qrySkw, qryCols } from '@/business/api';

export default {
  SEARCH(content, w) {
    content.commit('UPDATE_WORD', w);
    search({ w }).then(data => {
      // //console.log('search', data);
      content.commit('UPDATE_HISTORY', w);
      if (data.data.code === RESCODE.SUCCESS) {
        content.commit('SEARCH_GET', data.data);
      } else {
        // reset
        content.dispatch('getNoSearchRes');
        content.commit('SEARCH_RESET');
      }
    });
    // .catch(e => {
    //   // //console.log('e', e);
    // });
  },
  getNoSearchRes(content) {
    // eslint-disable-next-line
    const id = content.rootState.channelConfig.config.id;
    qryCols({ id, ps: 30 }).then(colsData => {
      // //console.log('colsData', colsData);
      content.commit('NO_SEARCH_INIT', colsData.data.res);
      // if (colsData.data.res.cols.length === 3) {
      //   // 同时返回了分类资源
      //   content.commit('CLASS_INIT', colsData.data.res.cols[2]);
      // }
    });
  },
  QRY_SKW(content) {
    //
    content.commit('HISTORY');
    qrySkw().then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        content.commit('SKW_GET', data.data.words);
      }
    });
  },
  MORE_SEARCH_RES(content, w) {
    const px = parseInt(content.state.px, 10);
    // TODO
    if (!content.state.more) {
      Vue.prototype.$promptTip('app', {
        content: MSG.NO_MORE,
      });
      return;
    }
    search({ w, px }).then(data => {
      if (data.data.code === RESCODE.SUCCESS) {
        content.commit('SEARCH_MORE', data.data);
      } else {
        Vue.prototype.$promptTip('app', {
          content: MSG.NO_MORE,
        });
      }
    });
  },
};
