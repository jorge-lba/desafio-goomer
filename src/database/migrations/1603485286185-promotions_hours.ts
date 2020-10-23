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
          name: 'promotion_id',
          type: 'integer'
        },
        {
          name: '',
          type: 'integer',
          isNullable: false
        },
        {
          name: 'weekday_start',
          type: 'integer',
          isNullable: false
        },
        {
          name: 'weekday_end',
          type: 'integer',
          isNullable: false
        },
        {
          name: 'opening_time',
          type: 'string',
          isNullable: false
        },
        {
          name: 'closing_time',
          type: 'string',
          isNullable: false
        },
        {
          name: 'valid',
          type: 'boolean',
          isNullable: false
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
