import { UserRights } from '@ring-order/lib/constant/rights';
/**
 * 过滤重复铃音
 * @param userOrOpRights 用户或运营点权益
 * @param oldRingList 旧的铃音列表
 * @param newRinglist 新的铃音列表
 */
export function ringListFilter(userOrOpRights, oldRingList = [], newRinglist = []) {
  const oldRingIdList = oldRingList.map(ring => ring.id);
  return newRinglist.filter(ring => {
    // 过滤重复铃音
    if (oldRingIdList.indexOf(ring.id) !== -1) {
      return false;
    }
    const { cap } = ring;
    ring.isFree = false;
    // （diy用户 || 运营点具有diy权益）+ 拥有diy能力的资源
    if (userOrOpRights === UserRights.Diy && cap && cap.diy) {
      ring.isFree = true;
    }
    return true;
  });
}
