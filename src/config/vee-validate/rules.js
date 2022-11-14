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
