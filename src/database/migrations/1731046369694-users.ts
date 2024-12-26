import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1731046369694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'first_name', type: 'varchar', isNullable: false },
          { name: 'sur_name', type: 'varchar', isNullable: false },
          { name: 'middle_name', type: 'varchar', isNullable: true },
          { name: 'password', type: 'varchar', isNullable: false },
          { name: 'phone', type: 'varchar', isUnique: false },
          { name: 'phone_verified_at', type: 'date', isNullable: true },
          { name: 'avatar', type: 'varchar', isNullable: true },
          { name: 'email', type: 'varchar', isUnique: true, isNullable: true },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'timestamp', isNullable: true },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}