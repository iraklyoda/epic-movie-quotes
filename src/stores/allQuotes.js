import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios.js";

export const useAllQuotesStore = defineStore("allQuotes", () => {
  const quotes = ref([]);
  const getQuotes = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/read"
      );
      quotes.value = response.data;
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return { quotes, getQuotes };
});
