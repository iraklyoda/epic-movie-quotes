import { createRouter, createWebHistory } from "vue-router";

import AuthComponent from "@/components/landing_page/AuthComponent.vue";
import RegisterComponent from "@/components/landing_page/RegisterComponent.vue";
import ForgotPassword from "@/components/landing_page/ForgotPassword.vue";
import CheckComponent from "@/components/landing_page/CheckComponent.vue";
import CheckPassword from "@/components/landing_page/CheckPassword.vue";
import CreateComponent from "@/components/landing_page/CreateComponent.vue";
import VerifiedComponent from "@/components/landing_page/VerifiedComponent.vue";

import NotFound from "@/views/NotFound.vue";
import NotAllowed from "@/views/NotAllowed.vue";

import LandingPage from "@/views/LandingPage.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import MovieList from "@/views/MovieList.vue";
import PageLayout from "@/components/epic_quotes/PageLayout.vue";
import ChangeUsername from "@/components/profile_page/ChangeUsername.vue";
import ChangePassword from "@/components/profile_page/ChangePassword.vue";
import ProfileLayout from "@/components/profile_page/ProfileLayout.vue";
import ProfileEmails from "@/components/profile_page/ProfileEmails.vue";
import AddEmail from "@/components/profile_page/AddEmail.vue";
import ProfilePage from "@/views/ProfilePage.vue";
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
      children: [
        { path: "/login", component: AuthComponent, name: "Login" },
        { path: "/register", component: RegisterComponent, name: "Register" },
        {
          path: "/forgotpassword",
          component: ForgotPassword,
          name: "ForgotPassword",
        },
        {
          path: "/checkemail",
          component: CheckComponent,
          name: "CheckEmail",
        },
        {
          path: "/checkpassword",
          component: CheckPassword,
          name: "CheckPassword",
        },
        {
          path: "/createpassword/:token/:email",
          component: CreateComponent,
          name: "CreatePassword",
        },
        {
          path: "emailactivated",
          component: VerifiedComponent,
          name: "EmailActivated",
        },
      ],
    },
    {
      path: "/page",
      component: PageLayout,
      children: [
        { path: "", redirect: "/newsfeed" },
        {
          path: "/profile",
          component: ProfileLayout,
          children: [
            { path: "", redirect: "edit" },
            {
              path: "edit",
              component: ProfilePage,
              name: "ProfilePage",
              children: [
                {
                  path: "changename",
                  component: ChangeUsername,
                  name: "ChangeName",
                },
                {
                  path: "changepassword",
                  component: ChangePassword,
                  name: "ChangePassword",
                },
                {
                  path: "emails",
                  component: ProfileEmails,
                  name: "ProfileEmails",
                },
                {
                  path: "addemail",
                  component: AddEmail,
                  name: "AddEmail",
                },
              ],
            },
          ],
        },
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
    { path: "/:catchAll(.*)", component: NotFound, name: "NotFound" },
    { path: "/notAllowed", component: NotAllowed, name: NotAllowed },
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
