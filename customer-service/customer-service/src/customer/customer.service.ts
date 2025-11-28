import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
// import { RabbitMQPublisher } from '../rabbitmq/rabbitmq.publisher';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    // private readonly rabbitMQPublisher?: RabbitMQPublisher,
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    const savedCustomer = await this.customerRepository.save(customer);

    // Publish customer created event
    // await this.rabbitMQPublisher.publishCustomerCreated(savedCustomer);

    return savedCustomer;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepository.update(id, updateCustomerDto);
    const updatedCustomer = await this.findOne(id);

    // Publish customer updated event
    // await this.rabbitMQPublisher.publishCustomerUpdated(updatedCustomer);

    return updatedCustomer;
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}