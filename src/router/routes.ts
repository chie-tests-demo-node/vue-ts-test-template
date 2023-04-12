import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    redirect: "/login",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login/index.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home/index.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/manage",
        name: "manage",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Manage/index.vue"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
];

export default routes;
