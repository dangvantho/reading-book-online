import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';
import category from './reducers/category';
import genreReducer from './reducers/genreReducer';
import hotStoryReducer from './reducers/hotStoryReducer';
import listBookReducer from './reducers/listBookReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: category,
    listBook: listBookReducer,
    book: bookReducer,
    hotStories: hotStoryReducer,
    genre: genreReducer,
  },
});
