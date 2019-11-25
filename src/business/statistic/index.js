import { StatType } from '../constant';

// 铃音信息转化为埋点数据格式
export function ringProto(ring) {
  return {
    d_ringname: ring.title,
    d_ringno: ring.id,
    i_ltimes: ring.listen,
    i_desc: ring.desc,
    i_ringfns: ring.tfns,
    i_totaltime: ring.second,
    d_icon: ring.icon,
  };
}

// 页面信息转化为埋点数据格式
export function pageProto(page, state) {
  switch (page) {
    case 'home':
      return {
        d_srcalbumno: state.channelConfig.config.id,
        d_tabname: '推荐',
        d_entrytype: 'tab',
        d_entryname: 'home',
      };
    case 'classifyrings':
      return {
        d_srcalbumno: state.home.classid,
        d_tabname: state.home.selectClassify,
        d_entrytype: 'tab',
        d_entryname: 'classifyrings',
      };
    case 'swiperrings':
      return {
        d_srcalbumno: state.home.swipertarget,
        d_tabname: state.home.swiperring.name,
        d_entrytype: 'banner',
        d_entryname: 'swiperrings',
      };
    case 'search':
      if (state.search.searchRes.length === 0) {
        // 当前是搜索无结果列表
        return {
          d_srcalbumno: state.channelConfig.config.id,
          d_tabname: state.search.searchWords,
          d_entrytype: 'search',
          d_entryname: 'search',
        };
      }
      return {
        d_srcalbumno: '',
        d_tabname: state.search.searchWords,
        d_entrytype: 'search',
        d_entryname: 'search',
      };
    default:
      return {
        d_srcalbumno: '',
        d_tabname: '',
        d_entrytype: '',
        d_entryname: '',
      };
  }
}

// 试听
export function statRingListen(ring) {
  send(StatType.ListenRing, ring);
}

// 点击设彩铃
export function statSetRing(ring) {
  send(StatType.SetRing, ring);
}
// 订购设置过滤场景
export function statOrderFilter(stat) {
  send(StatType.OrderFilter, stat);
}
// 发送统计
function send(code, statObj) {
  try {
    // eslint-disable-next-line
    _wa('operaCode', 'send', code, statObj);
  } catch (err) {
    console.error(err);
  }
}
