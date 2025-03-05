import express from 'express';
import { pool } from '../db/init.js';

const router = express.Router();

// Добавление отзыва
router.post('/', async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const result = await pool.query(
      'INSERT INTO reviews (book_id, rating, comment) VALUES ($1, $2, $3) RETURNING *',
      [bookId, rating, comment]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Ошибка при добавлении отзыва', details: err.message });
  }
});

// Получение отзывов для книги
router.get('/book/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const result = await pool.query(
      'SELECT * FROM reviews WHERE book_id = $1 ORDER BY created_at DESC',
      [bookId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting reviews:', err);
    res.status(500).json({ error: 'Ошибка при получении отзывов', details: err.message });
  }
});

export default router; 