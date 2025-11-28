import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class CustomerHandler {
  @RabbitSubscribe({
    exchange: 'ecommerce.exchange',
    routingKey: 'customer.*',
    queue: 'product-service-customer-queue',
  })
  public async handleCustomerUpdate(msg: any) {
    console.log('Received customer update in Product service:', msg);
    // Here we would handle the customer update
    // For example, we might update a local cache or trigger some business logic
  }
}