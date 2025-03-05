import pkg from 'pg';
import { dbConfig } from '../config/database.js';

const { Pool } = pkg;

const pool = process.env.NODE_ENV === 'test' 
  ? {
      query: jest.fn().mockImplementation((text, params) => {
        if (text.includes('SELECT')) {
          return Promise.resolve({
            rows: [
              { id: 1, book_id: 1, rating: 5, comment: 'Test review', created_at: new Date() }
            ]
          });
        }
        if (text.includes('INSERT')) {
          const [bookId, rating, comment] = params;
          return Promise.resolve({
            rows: [
              { id: 1, book_id: bookId, rating, comment, created_at: new Date() }
            ]
          });
        }
        return Promise.resolve({ rows: [] });
      })
    }
  : new Pool(dbConfig);

// Обработка ошибок подключения только для продакшена
if (process.env.NODE_ENV !== 'test') {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
}

export default pool;