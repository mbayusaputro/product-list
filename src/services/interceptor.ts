import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dummyjson.com/',
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
