import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "@/config/axios/jwtAxios.js";
import axiosInstance from "@/config/axios/index.js";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref([]);
  const getMovies = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/movies/read"
      );
      movies.value = response.data;
      return movies;
    } catch (e) {
      console.log(e);
    }
  };

  const searchMovies = async (search) => {
    if (search !== "") {
      try {
        const response = await axiosInstance.post(
          import.meta.env.VITE_APP_ROOT_API + "/movies/search",
          search
        );
        movies.value = response.data;
      } catch (e) {
        console.log(e);
      }
    } else {
      getMovies();
    }
  };

  onMounted(() => {
    getMovies();
  });
  return { movies, getMovies, searchMovies };
});
