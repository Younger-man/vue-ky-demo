import { ResType } from '@ring-order/lib/constant/types';

export default {
  // 首页轮播图
  colResImg({ colRes: { cols = [] } = {} }) {
    for (let i = 0, len = cols.length; i < len; i++) {
      if (cols[i].type === ResType.Swiper) {
        return cols[i].cols;
      }
    }
    return [];
  },
  // 首页铃音
  colResRing({ colRes: { cols = [] } = {} }) {
    for (let i = 0, len = cols.length; i < len; i++) {
      if (cols[i].type === ResType.AlbumWithoutSurface) {
        return cols[i];
      }
    }
    return {};
  },

  swiperring({ swiperring: { rings = [] } = {} }) {
    if (rings.length > 0) {
      return rings;
    }
    return {};
  },

  compilationRes({ compilationRes: { rings = [] } = {} }) {
    if (rings.length > 0) {
      return rings;
    }
    return {};
  },
};
