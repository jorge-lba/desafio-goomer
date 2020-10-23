import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class promotionsHours1603485286185 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'promotions_hours',
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
          name: 'promotion_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'promotion_hours',
          columnNames: ['promotion_id'],
          referencedTableName: 'products_promotions',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promotions_hours')
  }
}
