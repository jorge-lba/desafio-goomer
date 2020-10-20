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
          name: 'id_restaurants',
          type: 'integer',
          isNullable: false
        },
        {
          name: 'weekday',
          type: 'string',
          isNullable: false
        },
        {
          name: 'opening_time',
          type: 'time',
          isNullable: false
        },
        {
          name: 'closing_time',
          type: 'time',
          isNullable: false
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('working_hours')
  }
}
