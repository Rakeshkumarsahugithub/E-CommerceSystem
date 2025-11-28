import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishCustomerCreated(customer: any) {
    await this.amqpConnection.publish('ecommerce.exchange', 'customer.created', {
      customerId: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
    });
  }

  async publishCustomerUpdated(customer: any) {
    await this.amqpConnection.publish('ecommerce.exchange', 'customer.updated', {
      customerId: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      updatedAt: new Date(),
    });
  }
}