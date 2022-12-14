import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import axios from "@/config/axios/jwtAxios.js";
import axiosInstance from "@/config/axios";

export const useSingleStore = defineStore("single", () => {
  const crud = ref(true);
  const movie = reactive([]);
  const getMovie = async (id) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/movies/movie/" + id
      );
      movie[0] = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const response = await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/movies/movie/delete/" + id
      );
    } catch (e) {
      console.log(e);
    }
  };

  return { crud, getMovie, deleteMovie, movie };
});
