import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create-new-db',
    name: 'createNewDb',
    component: () =>
      import(/* webpackChunkName: "createNewDb" */ '../pages/CreateNewDb.vue')
  },
  {
    path: '/view-db/:dbName?',
    name: 'viewDb',
    component: () =>
      import(/* webpackChunkName: "viewDb" */ '../pages/ViewDb.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
