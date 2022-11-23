import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios";

export const useCrudStore = defineStore("crud", () => {
  const crud = ref(true);
  const movies = ref({});

  return { crud, movies, readMovies };
});
