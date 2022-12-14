import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios.js";

export const useQuotesStore = defineStore("quotes", () => {
  const quotes = ref([]);
  const getQuotes = async (id) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/movie/" + id
      );
      quotes.value = response.data;
    } catch (e) {
      console.log(e);
    }
  };
  return { quotes, getQuotes };
});
