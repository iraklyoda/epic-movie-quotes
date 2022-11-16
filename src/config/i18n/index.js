import { createI18n } from "vue-i18n";
const i18n = createI18n({
  // default locale
  locale: localStorage.getItem("appLanguage") || "en",
  // translations
  messages: {
    en: {
      movieQuotes: "MOVIE QUOTES",
      signUp: "Sign up",
      logIn: "Log in",
      logInToYourAccount: "Log in to your account",
      welcomeBack: "Welcome back! Please enter your details.",
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
      dontHaveAnAccount: "Don't have an account?",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password",
      resetPassword: "Reset password",
      backToLogIn: "Back to log in",
      thankYou: "Thank you",
      checkMail:
        "Please check your email and follow the instructions to activate your account.",
      userNotFound: "User not found",
      passwordResetInstructions:
        "Enter the email and we’ll send an email with instructions to reset your password",
      goToMyEmail: "Go to my email",
      createNewPassword: "Create new password",
      newPasswordMustBe:
        "Your new password must be different from previous used passwords",
      accountActivated: "Your account has been activated!",
      sendInstructions: "Send instructions",
      interstellar: "Interstellar, 2014",
      interstellarQuote: "You have to leave something behind to go forward",
      tenenbaums: "The Royal Tenenbaums, 2001",
      tenenbaumsQuote:
        "I think we’re just gonna have to be secretly in love with search other and leave it that",
      lotr: "The Lord of the Rings, 2003",
      lotrQuote:
        "I see in your eyes the same fear that would take the heart of me....",
      rightsReserved: "2022 MOVIE QUOTES. ALL RIGHTS RESERVED.",
    },
    ka: {
      movieQuotes: "კინო ციტატები",
      signUp: "დარეგისტრირება",
      logIn: "შესვლა",
      logInToYourAccount: "დალოგინდით თქვენს ანგარიშზე",
      welcomeBack: "კეთილი იყოს თქვენი დაბრუნება. შეიყვანეთ თქვენი დეტალები",
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
      dontHaveAnAccount: "არ გაქვთ ანგარიში?",
      rememberMe: "დამიმახსოვრე",
      forgotPassword: "დაგავიწყდა პაროლი",
      resetPassword: "შეცვალე პაროლი",
      backToLogIn: "უკან ავტორიზაციაზე",
      thankYou: "მადლობა",
      checkMail:
        "გთხოვთ შეამოწმოთ თქვენი ელ-ფოსტა და მიყვეთ ინსტრუქციებს ექაუნთის გასააქტიურებლად",
      userNotFound: "მომხმარებელი ვერ მოიძებნა",
      goToMyEmail: "გადაგი მეილზე",
      createNewPassword: "შექმენი ახალი პაროლი",
      newPasswordMustBe:
        "შენი ახალი პაროლი უნდა განსხვავდებოდეს წინა პაროლებისაგან",
      accountActivated: "თქვენი ანგარიში გააქტიურდა!",
      passwordResetInstructions:
        "შეიყვანეთ ელ-ფოსტა და გამოგიგზავნით ინსტრუქციას პაროლის შეცვლასთან დაკავშირებით",
      sendInstructions: "გამოგზავნეთ ინსტრუქცია",
      interstellar: "ინტერსტელარი, 2014",
      interstellarQuote: "წინ წასვლის მიზნით რაღაცების დატოვება გიწევს",
      tenenbaums: "ტენენბაუმების ოჯახი, 2001",
      tenenbaumsQuote:
        "ვფიქრობ, ერთმანეთი საიდუმლოდ უნდა გვიყვარდეს და ასევე დავტოვოთ",
      lotr: "ბეჭდების მბრძანებელი, 2003",
      lotrQuote:
        "შენს თვალებში იგივე შიშს ვხედავ რომელიც ჩემს გულს წაიღებდა...",
      rightsReserved: "2022 კინო ციტატები. ყველა უფლება დაცულია.",
    },
  },
});

export default i18n;
