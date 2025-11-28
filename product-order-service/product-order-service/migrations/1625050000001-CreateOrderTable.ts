import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrderTable1625050000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customerId',
            type: 'int',
          },
          {
            name: 'totalAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
            default: "'pending'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Create junction table for order-products relationship
    await queryRunner.createTable(
      new Table({
        name: 'order_products_product',
        columns: [
          {
            name: 'orderId',
            type: 'int',
          },
          {
            name: 'productId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      'order_products_product',
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_products_product',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('order_products_product');
    if (table) {
      const foreignKey1 = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('orderId') !== -1,
      );
      const foreignKey2 = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('productId') !== -1,
      );

      if (foreignKey1) {
        await queryRunner.dropForeignKey('order_products_product', foreignKey1);
      }
      if (foreignKey2) {
        await queryRunner.dropForeignKey('order_products_product', foreignKey2);
      }
    }
    await queryRunner.dropTable('order_products_product');
    await queryRunner.dropTable('order');
  }
}