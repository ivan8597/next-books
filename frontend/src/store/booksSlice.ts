import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

interface BooksState {
  mood: string | null;
  books: Book[];
}

const initialState: BooksState = {
  mood: null,
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
      state.books = getBooksForMood(action.payload);
    },
  },
});

// Статические данные о книгах
const getBooksForMood = (mood: string): Book[] => {
  const booksByMood: Record<string, Book[]> = {
    inspiration: [
      { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', description: 'Мистическая история о следовании за своей мечтой' },
      { id: 2, title: 'Man\'s Search for Meaning', author: 'Viktor Frankl', description: 'Мотивационная история о поиске смысла жизни' },
    ],
    calm: [
      { id: 3, title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', description: 'Поэтическая история о любви и жизни' },
      { id: 4, title: 'Zen and the Art of Motorcycle Maintenance', author: 'Robert M. Pirsig', description: 'Философская путешествие открытий' },
    ],
    adrenaline: [
      { id: 5, title: 'The Da Vinci Code', author: 'Dan Brown', description: 'Захватывающий детектив о древних секретах' },
      { id: 6, title: 'Jurassic Park', author: 'Michael Crichton', description: 'Научно-фантастический приключение с динозаврами' },
    ],
  };
  return booksByMood[mood] || [];
};

export const { setMood } = booksSlice.actions;
export default booksSlice.reducer;