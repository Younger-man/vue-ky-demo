import axios from 'axios';
import { isEmptyObject } from '../utils';

let defaultParams = {};

/**
 * 设置所有请求都需要带上的参数
 * @param params 参数
 */
export function setDefaultParams(params) {
  if (isEmptyObject(defaultParams)) {
    defaultParams = params;
  } else {
    defaultParams = {
      ...defaultParams,
      ...params,
    };
  }
}

// 添加默认参数
function paramsInterceptor(config) {
  config.params = {
    ...defaultParams,
    ...(config.params || {}),
    r: Math.random(),
  };

  return config;
}

const instance = axios.create({
  timeout: 5 * 1000,
  withCredentials: true,
  params: '',
});

instance.interceptors.request.use(paramsInterceptor, error => Promise.reject(error));

export default instance;
