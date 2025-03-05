import express from 'express';
import { pool } from '../index.js';
import booksData from '../data/books.js';

const router = express.Router();

router.get('/recommendations', async (req, res) => {
  const { mood } = req.query;
  const recommendations = booksData[mood] || [];
  res.json(recommendations);
});

router.post('/reviews', async (req, res) => {
  const { bookId, rating, comment } = req.body;
  const query = 'INSERT INTO reviews (book_id, rating, comment) VALUES ($1, $2, $3) RETURNING *';
  try {
    const result = await pool.query(query, [bookId, rating, comment]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/reviews', async (req, res) => {
  const query = 'SELECT * FROM reviews';
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;