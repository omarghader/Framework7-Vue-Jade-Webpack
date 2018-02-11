// import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';
import HomePage from './pages/home/index.js';
import LoginPage from './pages/login/index.js';

export default [
  {
    name:'home',
    path: '/',
    component: HomePage,
  },
  {
    name:'login',
    path: '/login',
    component: LoginPage
  },
  {
    name:'panel-left',
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    name:'panel-right',
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    name:'about',
    path: '/about/',
    component: AboutPage,
  },
  {
    name:'form',
    path: '/form/',
    component: FormPage,
  },
  {
    name:'dynamic-route',
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    name:'error',
    path: '(.*)',
    component: NotFoundPage,
  },
];
