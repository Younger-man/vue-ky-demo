export function syncLoginPhone(phone) {
  try {
    // eslint-disable-next-line no-undef
    kyapp.syncLoginPhone(phone);
  } catch (e) {
    console.log('客户端未实现kyapp.syncLoginPhone接口');
  }
}
