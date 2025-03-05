process.env.NODE_ENV = 'test';

import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import reviewsRouter from '../routes/reviews.js';
import pool from '../db/pool.js';

const app = express();
app.use(express.json());
app.use('/api/reviews', reviewsRouter);

describe('Reviews API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/reviews/book/:bookId', () => {
    test('возвращает отзывы для книги', async () => {
      const response = await request(app)
        .get('/api/reviews/book/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('book_id');
      expect(response.body[0]).toHaveProperty('rating');
      expect(response.body[0]).toHaveProperty('comment');
    });
  });

  describe('POST /api/reviews', () => {
    test('создает новый отзыв', async () => {
      const newReview = {
        bookId: 1,
        rating: 5,
        comment: 'Great book!',
      };

      const response = await request(app)
        .post('/api/reviews')
        .send(newReview)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.book_id).toBe(newReview.bookId);
      expect(response.body.rating).toBe(newReview.rating);
      expect(response.body.comment).toBe(newReview.comment);
    });

    test('валидирует данные отзыва', async () => {
      const invalidReview = {
        bookId: 1,
        // missing rating and comment
      };

      const response = await request(app)
        .post('/api/reviews')
        .send(invalidReview)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('required');
    });
  });
});