import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class productsPromotions1603485111665 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products_promotions',
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
          name: 'description',
          type: 'string'
        },
        {
          name: 'price',
          type: 'number',
          isNullable: false
        },
        {
          name: 'product_id',
          type: 'integer'
        },
        {
          name: 'weekday_start',
          type: 'integer'
        },
        {
          name: 'weekday_end',
          type: 'integer'
        },
        {
          name: 'time_start',
          type: 'string'
        },
        {
          name: 'time_end',
          type: 'string'
        },
        {
          name: 'valid',
          type: 'boolean'
        }
      ],
      foreignKeys: [
        {
          name: 'product_promotion',
          columnNames: ['product_id'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_promotions')
  }
}
