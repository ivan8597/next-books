'use client';

import { useParams } from 'next/navigation';
import BookDetails from '../../../components/BookDetails';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export default function BookPage() {
  const { id } = useParams();
  const book = useSelector((state: RootState) => 
    state.books.books.find(b => b.id === Number(id))
  );

  if (!book) return <div>Книга не найдена</div>;

  return <BookDetails book={book} />;
} 