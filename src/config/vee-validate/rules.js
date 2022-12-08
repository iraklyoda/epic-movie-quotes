import { defineRule } from "vee-validate"; // npm install vee-validate --save
import {
  required,
  email,
  min,
  confirmed,
  max,
  alpha_num,
} from "@vee-validate/rules"; // npm install @vee-validate/rules

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule("alpha_num", alpha_num);
defineRule("lowercase", (value) => {
  if (value !== String(value).toLowerCase()) {
    return false;
  } else {
    return true;
  }
});

defineRule("geo_num", (value) => {
  const regexGeorgia = /[\u10A0-\u10FF]/;
  if (!regexGeorgia.test(value)) {
    return "გთხოვთ დარეგისტრირდეთ Redberry-ს მეილით (youremail@redberry.ge)";
  }
  return true;
});


