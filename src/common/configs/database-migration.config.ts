import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const DbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false, // Always set to false in production
  logging: true, // Enable logging for debugging
  entities: ['./dist/database/entities/*.js'],
  migrationsRun: true,
  migrations: ['./dist/database/migrations/*.js'],
  // subscribers: ['./dist/database/subscribers/*.js'],
}; 

const AppDataSource = new DataSource(DbConfig);
AppDataSource.initialize()
  .then(() => {
    console.log('🟢 Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('🟥 Error during Data Source initialization', err);
  });

export default AppDataSource;
