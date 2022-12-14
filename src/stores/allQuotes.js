import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios.js";
import axiosInstance from "@/config/axios/index.js";

export const useAllQuotesStore = defineStore("allQuotes", () => {
  const quotes = ref([]);
  const currentPage = ref(1);
  const quotesLikeActionStatus = ref(0);

  const getQuotes = async () => {
    const response = await axios.get(
      import.meta.env.VITE_APP_ROOT_API +
        "/quotes/read?page=" +
        currentPage.value
    );
    quotes.value = quotes.value.concat(response.data.data);
  };

  const getNumberQuotes = async (search) => {
    try {
      const response = await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/get",
        {
          number: quotes.value.length,
          search: search,
        }
      );
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
        if (currentPage.value === 1 && search.search !== "") {
          searchedQuotes.value = [];
          quotes.value = searchedQuotes.value;
        }
        console.log(e);
      }
    } else {
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
