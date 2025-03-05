import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import reviewsReducer from './reviewsSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;