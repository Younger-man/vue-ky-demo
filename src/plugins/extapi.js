/**
 * 在h5页面点击本地铃声设置按钮为用户设置本地铃声
 * @param {*} wno 铃音编号
 * @param {*} wurl 铃音url
 * @param {*} wname 铃音名称
 */

export function kySetRing(wno, wurl, wname) {
  try {
    const reg = new RegExp('^http:|^https:', 'gi');
    if (!reg.test(wurl)) {
      wurl = window.location.protocol + wurl;
    }
    // eslint-disable-next-line
    KuYinExt.setRing(wno, wurl, wname);
  } catch (e) {
    // console.log(e);
  }
}
