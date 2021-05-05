import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import articleRoutes from './routes/articles.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/articles', articleRoutes);

const CONNECTION_URL = 'mongodb+srv://alangallardo:WpBZ7o1zZufg3J1B@cluster0.e0zey.mongodb.net/Singularity?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);