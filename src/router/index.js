import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Api from '@/views/Api.vue';
import Database from '@/views/Database.vue';
import Class from '@/views/Class.vue';
import Document from '@/views/Document.vue';
import User from '@/views/User.vue';
import Setting from '@/views/Setting.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import NotLogin from '@/views/NotLogin.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [{
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: NotFound,
},{
  path: '/login',
  name: 'Login',
  component: Login,
},{
  path: '/notlogin',
  name: 'NotLogin',
  component: NotLogin,
},{
  path: '/home/:user',
  name: 'Home',
  component: Home,
},{
  path: '/api',
  name: 'Api',
  component: Api,
},{
  path: '/database',
  name: 'Database',
  component: Database,
},{
  path: '/class/:user',
  name: 'Class',
  component: Class,
},{
  path: '/document',
  name: 'Document',
  component: Document,
},{
  path: '/user',
  name: 'User',
  component: User,
},{
  path: '/setting/:user',
  name: 'Setting',
  component: Setting,
},{
  path: '/about',
  name: 'About',
  component: About,
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫 未登录时进入任何页面都会被重定向到登录页面 校验localStorage中的username
router.beforeEach((to, from, next) => {
  const loginedUser = localStorage.getItem('loginedUserInfo');
  if (!loginedUser && to.name !== 'Login') {
    next({
      name: 'Login'
    })
  } else {
    next();
  }
})

// 清除localStorage中的username
router.afterEach((to, from) => {
  if (to.name === 'Login') {
    localStorage.removeItem('loginedUserInfo');
  }
})

export default router;