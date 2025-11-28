import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrderHandler {
  @RabbitSubscribe({
    exchange: 'ecommerce.exchange',
    routingKey: 'order.*',
    queue: 'customer-service-order-queue',
  })
  public async handleOrderUpdate(msg: any) {
    console.log('Received order update in Customer service:', msg);
    // Here we would handle the order update
    // For example, we might update a local cache or trigger some business logic
  }
}