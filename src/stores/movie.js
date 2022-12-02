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
      return movies;
    } catch (e) {
      console.log(e);
    }
  };
  onMounted(() => {
    getMovies();
  });
  return { movies, getMovies };
});
