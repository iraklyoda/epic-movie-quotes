import { createI18n } from "vue-i18n";
const i18n = createI18n({
  // default locale
  locale: "en",
  // translations
  messages: {
    en: {
      signUp: "Sign up",
      logIn: "Log in",
      getStarted: "Get Started",
      findAnyQuote: "Find any quote in millions of movie lines",
    },
    ka: {
      signUp: "დარეგისტრირება",
      logIn: "შესვლა",
      getStarted: "დაწყება",
      findAnyQuote: "იპოვე ციტატები მილიონობით ფილმის ხაზებიდან",
    },
  },
});


export default i18n;
