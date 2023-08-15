// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/booksApi';
import searchReducer from './features/searchSlice'; // Adjust the path accordingly
import filterReducer from './features/filterSlice'; // Adjust the path accordingly

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    search: searchReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
