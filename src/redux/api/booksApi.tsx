import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '../../types/globalTypes';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => 'books', 
    }),
    getSingleBook: builder.query<IBook, string>({
      query: (id) => `books/${id}`, // Assumes that you have a route like '/books/:id' for individual books
    }),
    addBook: builder.mutation<void, IBook>({
      query: (newBook) => ({
        url: 'books',
        method: 'POST',
        body: newBook,
      }),
    }),
    editBook: builder.mutation<void, { id: string; updatedBook: Partial<IBook> }>({
      query: ({ id, updatedBook }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: updatedBook,
      }),
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
    }),
    addReview: builder.mutation<void, { bookId: string; review: string }>({
      query: ({ bookId, review }) => ({
        url: `books/${bookId}/reviews`,
        method: 'POST',
        body: { review },
      }),
    }),
    getReviews: builder.query<string[], string>({
      query: (bookId) => `books/${bookId}/reviews`,
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation,useGetSingleBookQuery,useEditBookMutation,
  useDeleteBookMutation, useAddReviewMutation,useGetReviewsQuery  } = api;

