import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class address1603167201257 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'address',
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
          name: 'street',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'number',
          type: 'integer',
          isNullable: false
        },
        {
          name: 'complement',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'state',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'city',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'zip_code',
          type: 'varchar',
          isNullable: false
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address')
  }
}
