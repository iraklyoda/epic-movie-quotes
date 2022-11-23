import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import MovieList from "@/views/MovieList.vue";
import PageLayout from "@/components/epic_quotes/PageLayout.vue";
import AddMovie from "@/components/movies_list/AddMovie.vue";
import { isAuthenticated, isGuest } from "@/router/guards.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LandingPage,
      name: "Landing",
      beforeEnter: [isGuest],
    },
    {
      path: "/page",
      component: PageLayout,
      children: [
        { path: "", redirect: "/newsfeed" },
        {
          path: "/newsfeed",
          component: NewsFeed,
          name: "NewsFeed",
        },
        {
          path: "/movielist",
          component: MovieList,
          name: "MovieList",
          children: [
            {
              path: "addmovie",
              component: AddMovie,
              name: "AddMovie",
            },
          ],
        },

      ],
      beforeEnter: [isAuthenticated],
    },
  ],
});

export default router;
