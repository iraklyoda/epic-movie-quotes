import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "@/config/axios/jwtAxios.js";

export const useQuotesStore = defineStore("quote", () => {
  const quotes = ref([]);
  onMounted(() => {
    const getQuotes = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_ROOT_API + "/quotes/read"
        );
        response.data.forEach((quote) => {
          quotes.value.unshift({
            id: quote.id,
            image: quote.thumbnail,
            quote: quote.quote,
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    getQuotes();
  });
  return { quotes };

});
