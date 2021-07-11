import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';
import category from './reducers/category';
import genreReducer from './reducers/genreReducer';
import hotStoryReducer from './reducers/hotStoryReducer';
import listBookReducer from './reducers/listBookReducer';

export const store = configureStore({
  reducer: {
    category: category,
    listBook: listBookReducer,
    book: bookReducer,
    hotStories: hotStoryReducer,
    genre: genreReducer,
  },
});
