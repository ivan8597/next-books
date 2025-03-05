import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { pool } from './db/init.js'; // Импорт из init.js
import booksRoutes from './routes/books.js';
import reviewsRouter from './routes/reviews.js';

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).send('OK'));
app.use('/api/books', booksRoutes);
app.use('/api/reviews', reviewsRouter);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

export { pool };