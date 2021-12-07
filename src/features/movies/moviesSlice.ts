import { createEntityAdapter } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import apiConstants from "../../app/constants";

const requiredParams = { api_key: apiConstants.API_KEY, language: "en-US" };

// const moviesAdapter = createEntityAdapter<Movie[]>();

// const initialState = moviesAdapter.getInitialState();

const moviesApiSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMoviesByName: build.query<Movie[], string>({
      query: (name) => ({
        url: "search/movie",
        method: "GET",
        params: {
          ...requiredParams,
          query: name,
          page: "1",
          include_adult: "false",
        },

      }),
      transformResponse: (responseData:any) => {
        // return moviesAdapter.setAll(initialState, responseData.results);
        return responseData.results;
      }
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

export const { useGetMoviesByNameQuery, useGetMovieQuery } = moviesApiSlice;