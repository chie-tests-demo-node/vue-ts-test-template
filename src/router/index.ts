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
    component: () => import('@/pages/Login/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/pages/Login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/components/ViewLayout/index.vue'),
    children: [
      { path: "/testmap", name: "测试地址", component: () => import("@/pages/Map/index.vue") },
      { path: "/appMan", name: "应用管理", component: () => import("@/pages/ApplyMan/index.vue") },
    ],
  },
  // {
  //   path: '/testmap',
  //   component: () => import('@/pages/testmap.vue')
  // },
  {
    path: '/bigScreen',
    component: () => import('@/pages/BigScreen/index.vue')
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
  //路由模式：history   1.路径比较正规，没有#  2.兼容性不如hash,且需要服务端支持，否则一刷新页面就404了
  history: createWebHistory()
  //路由模式：hash  1.兼容性好，ie8都支持 2.路径在#后边，比较丑
  // history:createWebHashHistory()
});

// 全局路由守卫
// router.beforeEach((to, form, next) => { })

// 导出路由
export default router;