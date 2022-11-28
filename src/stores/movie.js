import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "@/config/axios/jwtAxios.js";

export const useMovieStore = defineStore("movie", () => {
  const crud = ref(true);
  const movies = ref([]);
  onMounted(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_ROOT_API + "/movies/read"
        );
        response.data.forEach((movie) => {
          movies.value.push({
            id: movie.id,
            image: movie.image,
            genres: JSON.parse(movie.genres),
            title: movie.title,
            director: movie.director,
            description: movie.description,
          });
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    getMovies();
  });
  return { crud, movies };
});
