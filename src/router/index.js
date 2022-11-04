import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: "/", component: LandingPage, name: "Landing" }],
});

export default router;
