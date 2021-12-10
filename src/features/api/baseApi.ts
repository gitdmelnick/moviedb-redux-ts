import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {apiConstants} from "../../app/constants";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiConstants.BASE_URL }),
  endpoints: () => ({}),
});
