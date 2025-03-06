import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Api from '@/views/Api.vue';
import Class from '@/views/Class.vue';
import Duration from '@/views/Duration.vue';
import Term from '@/views/Term.vue';
import Document from '@/views/Document.vue';
import Setting from '@/views/Setting.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import NotLogin from '@/views/NotLogin.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: () => {
      const loginedUser = localStorage.getItem('loginedUserInfo');
      let user = 'notlogin';
      if (loginedUser) {
        try {
          const userInfo = JSON.parse(loginedUser);
          user = userInfo.username || 'notlogin';
        } catch (error) {
          console.error('解析用户信息失败:', error);
        }
      }
      return { name: 'Home', params: { user } };
    }
  },
  {
    path: '/home/:user',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/class/:user',
    name: 'Class',
    component: Class,
    meta: {
      title: '课程页面'
    }
  },
  {
    path: '/setting/:user',
    name: 'Setting',
    component: Setting,
    meta: {
      title: '设置页面'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/duration/:user',
    name: 'Duration',
    component: Duration,
    meta: {
      title: '节时页面'
    }
  },
  {
    path: '/api',
    name: 'Api',
    component: Api,
    meta: {
      title: 'API 页面'
    }
  },
  {
    path: '/term/:user',
    name: 'Term',
    component: Term,
    meta: {
      title: '学期页面'
    }
  },
  {
    path: '/document',
    name: 'Document',
    component: Document,
    meta: {
      title: '文档页面'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于页面'
    }
  },
  {
    path: '/notlogin',
    name: 'NotLogin',
    component: NotLogin,
    meta: {
      title: '未登录提示'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫 未登录时进入任何页面都会被重定向到登录页面 校验localStorage中的username
router.beforeEach((to, from, next) => {
  const loginedUser = localStorage.getItem('loginedUserInfo');
  if (!loginedUser && to.name !== 'Login') {
    next({
      name: 'Login'
    });
  } else {
    next();
  }
});

// 清除localStorage中的username
router.afterEach((to, from) => {
  if (to.name === 'Login') {
    localStorage.removeItem('loginedUserInfo');
  }
});

// 清除localStorage中的username
router.afterEach((to, from) => {
  if (to.name === 'Login') {
    localStorage.removeItem('loginedUserInfo');
  }
})

export default router;