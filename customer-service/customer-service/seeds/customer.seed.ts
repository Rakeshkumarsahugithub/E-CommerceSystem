import { DataSource } from 'typeorm';
import { Customer } from '../src/customer/customer.entity';

export class CustomerSeed {
  public static async run(dataSource: DataSource): Promise<void> {
    const customerRepository = dataSource.getRepository(Customer);

    const customers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: '123 Main St, City, State 12345',
        phone: '+1234567890',
        isActive: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        address: '456 Oak Ave, City, State 67890',
        phone: '+1987654321',
        isActive: true,
      },
      {
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@example.com',
        address: '789 Pine Rd, City, State 54321',
        phone: '+1555666777',
        isActive: true,
      },
      {
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emily.williams@example.com',
        address: '321 Elm Blvd, City, State 98765',
        phone: '+1444333222',
        isActive: true,
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        address: '654 Maple Dr, City, State 13579',
        phone: '+1666777888',
        isActive: true,
      },
    ];

    for (const customerData of customers) {
      const existingCustomer = await customerRepository.findOne({
        where: { email: customerData.email },
      });

      if (!existingCustomer) {
        const customer = customerRepository.create(customerData);
        await customerRepository.save(customer);
        console.log(`Seeded customer: ${customer.firstName} ${customer.lastName}`);
      }
    }
  }
}