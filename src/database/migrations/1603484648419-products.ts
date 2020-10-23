import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class products1603484648419 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'string',
          isNullable: false
        },
        {
          name: 'price',
          type: 'number',
          isNullable: false
        },
        {
          name: 'description',
          type: 'string'
        },
        {
          name: 'restaurant_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'address_restaurant',
          columnNames: ['restaurant_id'],
          referencedTableName: 'restaurants',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
