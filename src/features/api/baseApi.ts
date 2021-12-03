import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import constants from '../../app/constants';
export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: constants.BASE_URL }),
    endpoints: () => ({}),
  })