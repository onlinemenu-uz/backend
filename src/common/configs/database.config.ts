import { registerAs } from '@nestjs/config';

export const config = {
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'testdb',
  synchronize: false, // Set to false in production
  logging: false,
  migrationsRun: true,
  autoLoadEntities: true,
  migrations: ['./src/database/migrations/*.js'],
  subscribers: ['./src/database/subscribers/*.ts'],


};
export const DatabseConfig = registerAs('database', () => (config));
