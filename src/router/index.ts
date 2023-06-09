// 1 引入所需方法
// 路由创建：createRouter
// 路由模式(两者任选其一)：createWebHistory - history模式、createWebHashHistory - hash模式
// RouteRecordRaw：意为路由原始信息 （使用vue3+js的不用引入）
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { isNull } from '../utils';

export const reidrect = (href: string) => {
  var prefix = process.env.VUE_APP_PBPATH;
  if (isNull(prefix) || prefix === '/') {
    prefix = '';
  }
  window.location.href = `${prefix}${href}`;
}

// 设置路由规则
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/pages/home.vue')
  },
  {
    path: '/login',
    component: () => import('@/pages/Login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/pages/home.vue'),
    children: [
      { path: "/cert/certManage", name: "根证书管理", component: () => import("@/pages/testmap.vue"), },
    ],
  },
  {
    path: '/testmap',
    component: () => import('@/pages/testmap.vue')
  },
  {
    // 定义404路由
    path: '/404',
    component: () => import('@/pages/notfound.vue')
  },
  {
    // 匹配为定义路由然后重定向到404页面
    path: '/:pathMath(.*)',
    redirect: '/404'
  }
];

// 设置路由
const router = createRouter({
  routes,
  //路由模式：history
  history: createWebHistory()
  //路由模式：hash
  // history:createWebHashHistory()
});

// 导出路由
export default router;