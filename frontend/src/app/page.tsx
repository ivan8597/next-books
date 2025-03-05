'use client';

import MoodSelector from '../components/MoodSelector';
import BookList from '../components/BookList';


export default function Home() {
  return (
    <main className="container">
      <h1>Книги для вашего настроения</h1>
      <MoodSelector />
      <BookList />
    </main>
  );
}

