import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { default as sessions } from 'express-session';
import connectRedis from 'connect-redis';
import ioredis from 'ioredis';

import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import providersRoutes from './routes/providers.routes';
import carsRoutes from './routes/cars.routes';
import dbConnection from './db/db.connection';

dotenv.config();

const redisStore = connectRedis(sessions);
const redis = new ioredis();
const db: string = process.env.MONGO_URL!;
const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dbConnection(db);
app.use(sessions({
  secret: process.env.SESSION_SECRET!,
  name: process.env.SESSION_COOKIE_ID,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new redisStore({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT!,
    client: redis,
    ttl: +process.env.REDIS_TTL!
  }),
}));

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/providers', providersRoutes);
app.use('/cars', carsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on localhost:8080`);
});
