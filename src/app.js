import logger from '#config/logger.js';
import authRoutes from '#routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);
app.get('/', (req, res) => {
  logger.info('Hello from logger');
  res.status(200).send('hello from Acquisitions!');
});
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquisitions API is running' });
});
app.use('/api/auth', authRoutes);
export default app;
