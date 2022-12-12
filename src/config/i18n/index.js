import { createI18n } from "vue-i18n";
import en from "@/config/i18n/localization/en.js";
import ka from "@/config/i18n/localization/ka.js";

const i18n = createI18n({
  // default locale
  locale: localStorage.getItem("appLanguage") || "en",
  // translations
  messages: {
    ...en,
    ...ka,
  },
});

export default i18n;
