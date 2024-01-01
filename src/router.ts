import { createRouter, createWebHashHistory } from "vue-router";
import Work from "./components/Work.vue";

const routes = [
  {
    path: "/:id",
    name: "Work",
    component: Work,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/undefined",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
