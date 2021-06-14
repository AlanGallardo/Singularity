import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import articleRoutes from './routes/articles.js';
import userRoutes from './routes/users.js';
import creditCardRoutes from './routes/creditCard.js';
import questionRoutes from './routes/questions.js';
import answerRoutes from './routes/answers.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/articles', articleRoutes);
app.use('/user', userRoutes);
app.use('/creditCard', creditCardRoutes);
app.use('/forum', questionRoutes);
app.use('/answers', answerRoutes);

app.get('/', (req, res) => {
  res.send('Running...');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);