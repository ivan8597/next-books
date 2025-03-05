import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../store';
import styles from '../styles/BookList.module.scss';

const BookList: React.FC = () => {
  const { mood, books } = useSelector((state: RootState) => state.books);

  return (
    <div className={styles.bookList}>
      <h2>Рекомендованные книги для {mood || ' вашего настроения'}</h2>
      {books.length ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link href={`/book/${book.id}`}>
                <strong>{book.title}</strong> by {book.author}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет рекомендаций для вашего настроения. Выберите настроение!</p>
      )}
    </div>
  );
};

export default BookList;