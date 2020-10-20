import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class restaurantsImages1603228576593 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'restaurants_images',
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
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'restaurant_id',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'image_restaurant',
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
    await queryRunner.dropTable('restaurants_images')
  }
}
