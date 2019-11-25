import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './action';
import { mutations } from './mutation';
import { state } from './state';
import { getters } from './getters';
import { createLogin } from './login';
import home from './home';
import search from './search';

export function createRoot() {
  return {
    actions,
    state,
    mutations,
    getters,
    modules: {
      login: createLogin(),
      home,
      search,
    },
  };
}

Vue.use(Vuex);

const storeOptions = createRoot();
export const store = new Vuex.Store(storeOptions);
