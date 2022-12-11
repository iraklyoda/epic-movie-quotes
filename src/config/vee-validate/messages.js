import { configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";
configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: { lowercase: "{field} field must be in lowercase" },
      names: {
        username: "Username",
        email: "Email",
        password: "Password",
        password_confirmation: "Password confirmation",
        new_password: "New password",
        new_password_confirmation: "New password confirmation",
      },
    },
    ka: {
      ...ka,
      names: {
        name: "სახელი",
        last_name: "გვარი",
        password: "პაროლი",
        new_password: "ახალი პაროლი",
        username: "უზერნეიმი",

      },
      messages: {
        _default: "{field}ს ველი არ არის ვალიდური",
        required: "აუცილებელი ველი",
        required_if: "აუცილებელი ველი",
        min: "{field} უნდა შედგებოდეს მინიმუმ 0:{length} სიმბოლოსგან",
        max: "{field} უნდა შედგებოდეს მაქსიმუმ 0:{length} სიმბოლოსგან",
        lowercase:
          "{field}ს ველი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს",
        alpha_num:
          "{field}ს ველი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს",
        email: "თქვენ მიერ შეყვანილი მეილი არასწორია",
        confirmed: "პაროლები არ ემთხვევა",
      },
    },
  }),
});
setLocale(localStorage.getItem("appLanguage") || "en");
