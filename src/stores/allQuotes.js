import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios.js";
import { useProfileStore } from "@/stores/profile";

export const useAllQuotesStore = defineStore("allQuotes", () => {
  const profileStore = useProfileStore();
  const quotes = ref([]);
  const currentPage = ref(1);
  const quotesLikeActionStatus = ref(0);

  const getQuotes = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API +
          "/quotes/read?page=" +
          currentPage.value
      );
      console.log(response.data);
      quotes.value = quotes.value.concat(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getNumberQuotes = async () => {
    console.log("djas");
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/get",
        {
          number: quotes.value.length,
        }
      );
      console.log(response.data);
      quotes.value = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const searchedQuotes = ref([]);

  const searchQuotes = async (search) => {
    if (search !== "") {
      try {
        const response = await axios.post(
          import.meta.env.VITE_APP_ROOT_API +
            "/quotes/search?page=" +
            currentPage.value,
          search
        );
        quotes.value = [];
        searchedQuotes.value = searchedQuotes.value.concat(response.data.data);
        quotes.value = searchedQuotes.value;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("wow");
      currentPage.value = 1;
      quotes.value = [];
      getQuotes();
    }
  };

  return {
    quotes,
    getQuotes,
    searchQuotes,
    searchedQuotes,
    quotesLikeActionStatus,
    getNumberQuotes,
    currentPage,
  };
});
