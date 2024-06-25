import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1719335881713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'email',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'password',
          type: 'text',
          isNullable: true,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
