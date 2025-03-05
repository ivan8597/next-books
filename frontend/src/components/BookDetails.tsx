'use client';

import { Book } from '../types';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import styles from '../styles/BookDetails.module.scss';
import Link from 'next/link';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  console.log('Styles:', styles);
  
  return (
    <div className={styles.bookDetails}>
      <Link href="/" className={styles.homeButton}>
        На главную страницу
      </Link>
      <h1>{book.title}</h1>
      <h2>by {book.author}</h2>
      <p>{book.description}</p>
      <ReviewForm bookId={book.id} />
      <ReviewList bookId={book.id} />
    </div>
  );
};

export default BookDetails; 