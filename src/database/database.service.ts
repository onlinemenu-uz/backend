import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/database/entities';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private dataSource: DataSource;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const DbConfig: DataSourceOptions = {
      type: 'postgres',
      host: this.configService.getOrThrow<string>('database.host'),
      port: this.configService.getOrThrow<number>('database.port'),
      username: this.configService.getOrThrow<string>('database.username'),
      password: this.configService.getOrThrow<string>('database.password'),
      database: this.configService.getOrThrow<string>('database.database'),
      synchronize: this.configService.getOrThrow<boolean>('database.synchronize'),
      logging: this.configService.getOrThrow<boolean>('database.logging'),
      entities: [User],
      migrationsRun: this.configService.get<boolean>('database.migrationsRun'),
      migrations: this.configService.get<string[]>('database.migrations'),
    };

    this.dataSource = new DataSource(DbConfig);

    try {
      await this.dataSource.initialize();
      console.log('🟢 Data Source has been initialized!');
    } catch (error) {
      console.error('🟥 Error during Data Source initialization', error);
    }
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }
}
