import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: { genre: '', publicationYear: '' },
  reducers: {
    setGenreFilter: (state, action) => {
      state.genre = action.payload;
    },
    setPublicationYearFilter: (state, action) => {
      state.publicationYear = action.payload;
    },
  },
});

export const { setGenreFilter, setPublicationYearFilter } = filterSlice.actions;
export default filterSlice.reducer;