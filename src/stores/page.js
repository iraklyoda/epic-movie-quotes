import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const usePageStore = defineStore("page", () => {
  const menuOpen = ref(false);
  function changeMenu() {
      menuOpen.value = !menuOpen.value;
  }

  return { menuOpen, changeMenu };
});
