import { baseApi } from "../api/baseApi";
import constants from "../../app/constants";

const requiredParams = { api_key: constants.API_KEY, language: "en-US" };

const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMoviesByName: build.query<Movie, string>({
      query: (name) => ({
        url: "search/movie/",
        method: "GET",
        params: {
          ...requiredParams,
          query: name,
          page: "1",
          include_adult: "false",
        },
      }),
    }),
    getMovie: build.query<Movie, number>({
      query: (id) => ({
        url: `movie/${id}`,
        method: "GET",
        params: {
          ...requiredParams,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesByNameQuery,  } = moviesApi;
