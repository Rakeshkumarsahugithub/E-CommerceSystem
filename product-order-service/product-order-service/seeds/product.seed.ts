import { DataSource } from 'typeorm';
import { Product } from '../src/product/product.entity';

export class ProductSeed {
  public static async run(dataSource: DataSource): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    const products = [
      {
        name: 'Laptop',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        stock: 50,
        isActive: true,
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 899.99,
        stock: 100,
        isActive: true,
      },
      {
        name: 'Headphones',
        description: 'Noise-cancelling wireless headphones',
        price: 199.99,
        stock: 200,
        isActive: true,
      },
      {
        name: 'Tablet',
        description: 'Lightweight tablet for entertainment and work',
        price: 599.99,
        stock: 75,
        isActive: true,
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracker and smartwatch combo',
        price: 299.99,
        stock: 150,
        isActive: true,
      },
    ];

    for (const productData of products) {
      const existingProduct = await productRepository.findOne({
        where: { name: productData.name },
      });

      if (!existingProduct) {
        const product = productRepository.create(productData);
        await productRepository.save(product);
        console.log(`Seeded product: ${product.name}`);
      }
    }
  }
}