import { createRouter, createWebHashHistory } from "vue-router";
import AdminTop from "../views/AdminTop.vue";
import DayReserve from "../views/DayReserve.vue";
import UserInfo from "../views/UserInfo.vue";
import CostomerRegistration from "../views/CostomerRegistration.vue";
import CostomerList from "../views/CostomerList.vue";
import ObserveLestenList from "../views/ObserveLestenList.vue";
import LestenRegistration from "../views/LestenRegistration.vue";

const routes = [
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
    path: "/costomerRegistration",
    name: "CostomerRegistration",
    component: CostomerRegistration,
  },
  {
    path: "/costomerList",
    name: "CostomerList",
    component: CostomerList,
  },
  {
    path: "/observeLestenList",
    name: "ObserveLestenList",
    component: ObserveLestenList,
  },
  {
    path: "/lestenRegistration",
    name: "LestenRegistration",
    component: LestenRegistration,
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

// 初回起動フラグ
let firstLoad = true;

router.beforeEach((from, to, next) => {
  // 初回起動時、リロード時は初期ページにリダイレクト
  if (firstLoad) {
    firstLoad = false;
    next("/");
  }
  next();
});
export default router;
