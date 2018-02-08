// import HomePage from './pages/home.vue';
import AboutPage from './pages/about/index.js';
import FormPage from './pages/form.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';
import SettingsPage from './pages/settings/index.js';

import HomePage from './pages/home/index.js';
import LoginPage from './pages/login/index.js';
import FeedbackPage from './pages/feedback/index.js';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/feedback/',
    component: FeedbackPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },  {
    path: '/feedback/',
    component: FeedbackPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
