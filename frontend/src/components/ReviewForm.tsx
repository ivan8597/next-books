import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addReview } from '../store/reviewsSlice';
import styles from '../styles/ReviewForm.module.scss';

interface ReviewFormProps {
  bookId: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addReview({ bookId, rating, comment }));
    setComment('');
    setRating(5);
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Рейтинг:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} звезд{value === 1 ? 'а' : ''}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment">Комментарий:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Добавить отзыв</button>
    </form>
  );
};

export default ReviewForm;