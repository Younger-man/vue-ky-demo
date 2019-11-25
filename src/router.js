import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home,
      redirect: '/home',
      meta: {
        deep: 0,
      },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        deep: 0,
      },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue'),
      meta: {
        deep: 2,
      },
    },
    {
      path: '/classify',
      name: 'classify',
      component: () => import(/* webpackChunkName: "classify" */ './views/classify.vue'),
      meta: {
        deep: 0,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/search/index.vue'),
      meta: {
        deep: 1,
      },
    },
    {
      path: '/classifyrings',
      name: 'classifyrings',
      component: () => import(/* webpackChunkName: "classifyrings" */ './views/classify-rings.vue'),
      meta: {
        deep: 2,
      },
    },
    {
      path: '/swiperrings',
      name: 'swiperrings',
      component: () => import(/* webpackChunkName: "homeclassify" */ './views/swiper-rings.vue'),
      meta: {
        deep: 2,
      },
    },
  ],
});
