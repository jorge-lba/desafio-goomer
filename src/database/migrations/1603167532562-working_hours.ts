import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class workingHours1603167532562 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'working_hours',
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
          name: 'restaurant_id',
          type: 'integer'
        },
        {
          name: 'weekday_start',
          type: 'string',
          isNullable: false
        },
        {
          name: 'weekday_end',
          type: 'string',
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
        }
      ],
      foreignKeys: [
        {
          name: 'working_restaurant',
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
    await queryRunner.dropTable('working_hours')
  }
}
