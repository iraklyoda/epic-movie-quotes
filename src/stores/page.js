import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const usePageStore = defineStore("page", () => {
  const menuOpen = ref(false);
  const searchFeedOpen = ref(false);
  const searchListOpen = ref(false);
  function changeMenu() {
    menuOpen.value = !menuOpen.value;
  }
  function changeFeedSearch() {
    searchFeedOpen.value = !searchFeedOpen.value;
  }

  function changeListSearch() {
    searchListOpen.value = !searchListOpen.value;
  }

  return {
    menuOpen,
    searchFeedOpen,
    changeMenu,
    changeFeedSearch,
    searchListOpen,
    changeListSearch,
  };
});
