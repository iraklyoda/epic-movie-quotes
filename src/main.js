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
import InputComponent from "@/components/ui/InputComponent.vue";

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

const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");
