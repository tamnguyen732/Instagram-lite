import { DataSource } from 'typeorm';
import { Comment, Post, User } from './entities';

const connectPostgreDb = () => {
  const AppDataSource = new DataSource({
    name: 'dedault',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'instagram-lite',
    synchronize: true,
    logging: true,
    entities: [User, Comment, Post],
  });
  return AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
};

export default connectPostgreDb;
