import { actions } from './action';
import { mutations } from './mutation';
import { state } from './state';
import { getters } from './getters';

export function createLogin() {
  return {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
  };
}
