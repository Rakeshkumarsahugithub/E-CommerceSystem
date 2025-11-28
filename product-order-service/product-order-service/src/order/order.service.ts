import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from '../product/product.service';
// import { RabbitMQPublisher } from '../rabbitmq/rabbitmq.publisher';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productService: ProductService,
    // private readonly rabbitMQPublisher: RabbitMQPublisher,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // First, let's verify that all products exist and calculate total
    let calculatedTotal = 0;
    const products: any[] = [];

    for (const productDto of createOrderDto.products) {
      const product = await this.productService.findOne(productDto.id);
      if (!product) {
        throw new Error(`Product with ID ${productDto.id} not found`);
      }
      calculatedTotal += product.price * productDto.quantity;
      products.push(product);
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      totalAmount: calculatedTotal,
      products,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Publish order created event
    // await this.rabbitMQPublisher.publishOrderCreated(savedOrder);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOneBy({
      id: id
    });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    const updatedOrder = await this.findOne(id);

    // Publish order updated event
    // await this.rabbitMQPublisher.publishOrderUpdated(updatedOrder);

    return updatedOrder;
  }

  async findByCustomer(customerId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerId },
      relations: ['products'],
      order: { createdAt: 'DESC' }
    });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}