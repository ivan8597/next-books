import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  id: number;
  bookId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewState {
  items: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  items: [],
  loading: false,
  error: null
};

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (review: { bookId: number; rating: number; comment: string }) => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!response.ok) throw new Error('Ошибка при добавлении отзыва');
    return response.json();
  }
);

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (bookId: number) => {
    const response = await fetch(`/api/reviews/book/${bookId}`);
    if (!response.ok) throw new Error('Ошибка при загрузке отзывов');
    return response.json();
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

export default reviewsSlice.reducer;