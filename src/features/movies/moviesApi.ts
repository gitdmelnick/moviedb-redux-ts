import { baseApi } from "../api/baseApi";

const API_KEY: string = "8f52ccf9f912af022f7ba1538c8115f4";
// Where do you store urls and api keys?
const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMoviesByName: build.query<Movie, string>({
      query: (name) => `search/movie/?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesByNameQuery } = moviesApi;
