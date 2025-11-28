import { DataSource } from 'typeorm';
import { CustomerSeed } from './customer.seed';

async function seed() {
  // This would typically be loaded from environment variables
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'customer_db',
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    await CustomerSeed.run(dataSource);
    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();