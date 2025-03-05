import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchReviews } from '../store/reviewsSlice';
import styles from '../styles/ReviewList.module.scss';

interface ReviewListProps {
  bookId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ bookId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(bookId));
  }, [bookId, dispatch]);

  if (loading) return <div>Загрузка отзывов...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className={styles.reviewList}>
      <h3>Отзывы</h3>
      {items.length === 0 ? (
        <p>Пока нет отзывов</p>
      ) : (
        <ul>
          {items.map((review) => (
            <li key={review.id}>
              <div className={styles.rating}>{'★'.repeat(review.rating)}</div>
              <p>{review.comment}</p>
              <small>{new Date(review.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList; 