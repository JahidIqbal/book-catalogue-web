import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReactNode } from 'react';

interface Book {
  Reviews: ReactNode;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => 'books',
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApi;
