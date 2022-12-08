import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios.js";
import { useProfileStore } from "@/stores/profile";

export const useAllQuotesStore = defineStore("allQuotes", () => {
  const profileStore = useProfileStore();
  const quotes = ref([]);

  const quotesLikeActionSatus = ref(0);

  const getQuotes = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/read"
      );
      quotes.value = response.data;
    } catch (e) {
      console.log(e);
    }
  };
  return { quotes, getQuotes, quotesLikeActionSatus};
});
