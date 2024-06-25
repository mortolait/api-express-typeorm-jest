import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migration1719336161562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'product',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'description',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'value',
              type: 'numeric', // assuming 'value' is a number (you can adjust type as needed)
              isNullable: true,
            },
            {
              name: 'code',
              type: 'text',
              isNullable: true,
            },
          ],
        }), true);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product');
      }

}
