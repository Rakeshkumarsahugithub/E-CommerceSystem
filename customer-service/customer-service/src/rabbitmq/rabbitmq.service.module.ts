import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQPublisher } from './rabbitmq.publisher';
import { OrderHandler } from './handlers/order.handler';

@Module({
  imports: [],
  providers: [RabbitMQPublisher, OrderHandler],
  exports: [RabbitMQPublisher],
})
export class RabbitMQServiceModule { }