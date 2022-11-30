import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/config/i18n";

import "@/config/vee-validate/rules.js";
import "@/config/vee-validate/messages.js";
import "@/style.css";

import MovieInput from "@/components/ui/movies/MovieInput.vue";
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
import AddIcon from "@/components/icons/AddIcon.vue";
import ChatIcon from "@/components/icons/ChatIcon.vue";
import DialogComponent from "@/components/ui/DialogComponent.vue";
import MovieDialog from "@/components/ui/MovieDialog.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import DotsMenu from "@/components/icons/DotsMenu.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";


import InputComponent from "@/components/ui/InputComponent.vue";
import LanguageChange from "@/components/ui/LanguageChange.vue";

const app = createApp(App);
const pinia = createPinia();

app.component("DialogComponent", DialogComponent);
app.component("MovieDialog", MovieDialog);
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
app.component("AddIcon", AddIcon);
app.component("ChatIcon", ChatIcon);
app.component("CloseIcon", CloseIcon);
app.component("CameraIcon", CameraIcon);
app.component("EditIcon", EditIcon);
app.component("DeleteIcon", DeleteIcon);
app.component("EyeIcon", EyeIcon);
app.component("DotsMenu", DotsMenu);
app.component("MovieInput", MovieInput);



app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");
