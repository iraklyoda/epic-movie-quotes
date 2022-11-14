import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import { isAuthenticated } from "@/router/guards.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LandingPage,
      meta: { isGuest: true },
      name: "Landing",
    },
    {
      path: "/newsfeed",
      component: NewsFeed,
      name: "NewsFeed",
      beforeEnter: [isAuthenticated],
    },
  ],
});



export default router;
