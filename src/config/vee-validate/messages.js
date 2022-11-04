import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";
configure({
  generateMessage: localize({
    ka: {
      ...ka,
      names: {
        name: "სახელი",
        last_name: "გვარი",
      },
      messages: {
        required: "აუცილებელი ველი",
        required_if: "აუცილებელი ველი",
        min: "{field} უნდა შედგებოდეს მინიმუმ 0:{length} სიმბოლოსგან",
        email: "თქვენ მიერ შეყვანილი მეილი არასწორია",
      },
    },
  }),
});
