import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '../../types/globalTypes';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => 'books', 
    }),
    addBook: builder.mutation<void, IBook>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = api;

