import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './database';
import { PORT } from './config';

// IMPORT ROUTES

import postRoutes from './routes/posts.routes';
import userRoutes from './routes/user.routes';

const app = express();

// General config

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// ROUTES
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('HOLA A RECUERDOS!!!!');
});

// PORT LISTEN

app.listen(PORT);
console.log(`Server on port ${PORT}`);
