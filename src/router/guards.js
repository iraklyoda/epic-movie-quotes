import { getJwtToken } from "@/helpers/jwt/index.js";

export function isAuthenticated() {
  if (!getJwtToken()) {
    return "/";
  }
}

export function isGuest() {
  if(getJwtToken()) {
    return "/newsfeed";
  }
}
