import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import MovieList from "@/views/MovieList.vue";
import PageLayout from "@/components/epic_quotes/PageLayout.vue";
import AddMovie from "@/components/movies_list/AddMovie.vue";
import MoviePage from "@/views/MoviePage.vue";
import AddQuote from "@/components/news_feed/AddQuote.vue";
import MovieQuote from "@/components/movies_list/AddQuote.vue";
import EditMovie from "@/components/movies_list/EditMovie.vue";
import ViewQuote from "@/components/movies_list/ViewQuote.vue";
import EditQuote from "@/components/movies_list/EditQuote.vue";
import { isAuthenticated, isGuest } from "@/router/guards.js";
import { useAuthStore } from "@/stores/auth";
import axios from "@/config/axios/jwtAxios.js";

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
          children: [
            {
              path: "addquote",
              component: AddQuote,
              name: "AddQuote",
            },
          ],
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
        {
          path: "/movie/:id",
          component: MoviePage,
          name: "MoviePage",
          children: [
            {
              path: "addQuote",
              component: MovieQuote,
              name: "MovieQuote",
            },
            {
              path: "viewquote/:quoteId",
              component: ViewQuote,
              name: "ViewQuote",
            },
            {
              path: "editquote/:quoteId",
              component: EditQuote,
              name: "EditQuote",
            },
            {
              path: "editMovie",
              component: EditMovie,
              name: "EditMovie",
            },
          ],
        },
      ],
      beforeEnter: [isAuthenticated],
    },
  ],
});

//

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.authenticated === null) {
    try {
      await axios.get(import.meta.env.VITE_APP_ROOT_API + "/me");
      authStore.authenticated = true;
    } catch (err) {
      authStore.authenticated = false;
    } finally {
      return next();
    }
  }
  return next();
});

export default router;
