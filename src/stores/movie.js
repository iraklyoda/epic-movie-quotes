import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "@/config/axios/jwtAxios.js";

export const useMovieStore = defineStore("movie", () => {
  const movies = ref([]);
  const getMovies = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/movies/read"
      );
      movies.value = response.data;
      console.log(response);
      return movies;
    } catch (e) {
      console.log(e);
    }
  };

  const searchMovies = async (search) => {
    if (search !== "") {
      try {
        const response = await axios.post(
          import.meta.env.VITE_APP_ROOT_API + "/movies/search",
          search
        );
        console.log(response);
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
