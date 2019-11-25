import ajax from './ajax';

const preUrl = `${window.ordersdkHostUrl || '//order.diyring.cc'}/union/api/v1/`;

/**
 * 查询栏目资源和渠道信息
 * @param {*} id 资源编号
 */
export function qryCols({ id, px, ps }) {
  return ajax.get(`${preUrl}q_cols`, {
    params: {
      id,
      px,
      ps,
    },
  });
}

/**
 * 查询栏目下铃音资源
 * @param {*} id 栏目编号
 */
export function qryColres({ id, px, ps }) {
  return ajax.get(`${preUrl}q_colres`, {
    params: {
      id,
      px,
      ps,
    },
  });
}

/**
 * 搜索热词
 */
export function qrySkw() {
  return ajax.get(`${preUrl}q_skw`, {
    params: {},
  });
}

/**
 * 搜索铃音
 * @param {*} w 关键词
 */
export function search({ w, px, ps }) {
  return ajax.get(`${preUrl}search`, {
    params: {
      w,
      px,
      ps,
    },
  });
}

/**
 * 查询铃音信息
 * @param {*} id  铃音编号
 */
export function qryRing({ id }) {
  return ajax.get(`${preUrl}q_ring`, {
    params: {
      id,
    },
  });
}
