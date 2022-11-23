import { useAuthStore } from "@/stores/auth";

export const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/";
  }
};

export const isGuest = () => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    return "/newsfeed";
  }
};
