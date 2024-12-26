import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from './redis/redis.module';
import { DatabseConfig } from 'src/common/configs';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.getOrThrow<ConfigType<typeof DatabseConfig>>('database')
        return {
          type: 'postgres',
          host: config.host,
          port: +config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          synchronize: config.synchronize,
          logging: config.logging,
          autoLoadEntities: config.autoLoadEntities,
          migrations: config.migrations,
          migrationsRun: config.migrationsRun,
        }
      },
    }),
    RedisModule],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) { }
}
