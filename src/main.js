import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import "@/style.css";

import DownArrow from "@/components/icons/arrowDownIcon.vue";

const app = createApp(App);
app.component("DownArrow", DownArrow);

app.use(createPinia());
app.use(router);

app.mount("#app");
