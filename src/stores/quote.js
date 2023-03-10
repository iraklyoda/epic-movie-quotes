import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "@/config/axios/jwtAxios.js";
import axiosInstance from "@/config/axios/index.js";
import { useSingleStore } from "@/stores/single.js";

export const useQuoteStore = defineStore("singleQuote", () => {
  const quote = reactive([]);
  const getQuote = async (id) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/quote/" + id
      );
      quote[0] = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteQuote = async (id) => {
    try {
      const response = await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/quote/delete/" + id
      );
    } catch (e) {
      console.log(e);
    }
  };

  return { deleteQuote, getQuote, quote };
});
