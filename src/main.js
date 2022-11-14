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
import InputComponent from "@/components/ui/InputComponent.vue";

const app = createApp(App);
app.component("DownArrow", DownArrow);
app.component("InputComponent", InputComponent);
app.component("GoogleIcon", GoogleIcon);
app.component("VisibilityIcon", VisibilityIcon);
app.component("InvalidIcon", InvalidIcon);
app.component("ValidIcon", ValidIcon);

const pinia = createPinia();
app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");
