import { configureStore } from '@reduxjs/toolkit';
import category from './reducers/category';
import listBookReducer from './reducers/listBookReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: category,
    listBook: listBookReducer,
  },
});
