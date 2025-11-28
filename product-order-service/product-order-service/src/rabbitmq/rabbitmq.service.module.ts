import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQPublisher } from './rabbitmq.publisher';
import { CustomerHandler } from './handlers/customer.handler';

@Module({
  imports: [],
  providers: [RabbitMQPublisher, CustomerHandler],
  exports: [RabbitMQPublisher],
})
export class RabbitMQServiceModule { }