import { createI18n } from "vue-i18n";
const i18n = createI18n({
  // default locale
  locale: "en",
  // translations
  messages: {
    en: {
      movieQuotes: "MOVIE QUOTES",
      signUp: "Sign up",
      logIn: "Log in",
      getStarted: "Get Started",
      findAnyQuote: "Find any quote in millions of movie lines",
      createAccount: "Create an account",
      startJourney: "Start your journey!",
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      enterName: "Enter your name",
      enterEmail: "Enter your email",
      confirmYourPassword: "Confirm your password",
      signUpGoogle: "Sign up with google",
      alreadyHaveAnAccount: "Already have an account?",

    },
    ka: {
      movieQuotes: "კინო ციტატები",
      signUp: "დარეგისტრირება",
      logIn: "შესვლა",
      getStarted: "დაწყება",
      findAnyQuote: "იპოვე ციტატები მილიონობით ფილმის დიალოგიდან",
      createAccount: "შექმენით ანგარიში",
      startJourney: "დაიწყეთ მოგზაურობა!",
      name: "სახელი",
      email: "ელ-ფოსტა",
      password: "პაროლი",
      confirmPassword: "პაროლის დადასტურება",
      enterName: "შეიყვანეთ სახელი",
      enterEmail: "შეიყვანეთ ელ-ფოსტა",
      confirmYourPassword: "დაადასტურეთ პაროლი",
      signUpGoogle: "გუგლით რეგისტრაცია",
      alreadyHaveAnAccount: "უკვე გაქვთ ანგარიში?",
    },
  },
});


export default i18n;
