import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class errors1603547163745 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'errors_request',
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
          name: 'error',
          type: 'string'
        },
        {
          name: 'query',
          type: 'string'
        },
        {
          name: 'parameters',
          type: 'string'
        },
        {
          name: 'message',
          type: 'string'
        },
        {
          name: 'date',
          type: 'timestamp'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('errors_request')
  }
}
