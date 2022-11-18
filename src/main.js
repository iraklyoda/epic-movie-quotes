import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/config/i18n";

import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages.js";
import "@/style.css";

import DownArrow from "@/components/icons/ArrowDownIcon.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import VisibilityIcon from "@/components/icons/VisibilityIcon.vue";
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import ValidIcon from "@/components/icons/ValidIcon.vue";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import CheckEmailIcon from "@/components/icons/CheckEmailIcon.vue";
import EmailSentIcon from "@/components/icons/EmailSentIcon.vue";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import WriteIcon from "@/components/icons/WriteIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MovieIcon from "@/components/icons/MovieIcon.vue";

import InputComponent from "@/components/ui/InputComponent.vue";
import LanguageChange from "@/components/ui/LanguageChange.vue";

const app = createApp(App);
app.component("DownArrow", DownArrow);
app.component("InputComponent", InputComponent);
app.component("GoogleIcon", GoogleIcon);
app.component("VisibilityIcon", VisibilityIcon);
app.component("InvalidIcon", InvalidIcon);
app.component("ValidIcon", ValidIcon);
app.component("LeftArrowIcon", LeftArrowIcon);
app.component("CheckEmail", CheckEmailIcon);
app.component("EmailSent", EmailSentIcon);
app.component("SearchIcon", SearchIcon);
app.component("MenuIcon", MenuIcon);
app.component("NotificationIcon", NotificationIcon);
app.component("WriteIcon", WriteIcon);
app.component("CommentIcon", CommentIcon);
app.component("HeartIcon", HeartIcon);
app.component("HomeIcon", HomeIcon);
app.component("MovieIcon", MovieIcon);
app.component("LanguageChange", LanguageChange);





const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");
