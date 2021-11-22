import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AdminTop from "../views/AdminTop.vue";
import DayReserve from "../views/DayReserve.vue";
import UserInfo from "../views/UserInfo.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AdminTop",
    component: AdminTop,
  },
  {
    path: "/dayReserve",
    name: "DayReserve",
    component: DayReserve,
  },
  {
    path: "/userInfo",
    name: "UserInfo",
    component: UserInfo,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
