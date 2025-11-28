import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishOrderCreated(order: any) {
    await this.amqpConnection.publish('ecommerce.exchange', 'order.created', {
      orderId: order.id,
      customerId: order.customerId,
      products: order.products,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
    });
  }

  async publishOrderUpdated(order: any) {
    await this.amqpConnection.publish('ecommerce.exchange', 'order.updated', {
      orderId: order.id,
      customerId: order.customerId,
      status: order.status,
      updatedAt: new Date(),
    });
  }
}