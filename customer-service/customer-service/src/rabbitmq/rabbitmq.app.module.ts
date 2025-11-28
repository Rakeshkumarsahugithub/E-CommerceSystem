import { Module, Global } from '@nestjs/common';
import { RabbitMQConfigModule } from './rabbitmq.config.module';
import { RabbitMQServiceModule } from './rabbitmq.service.module';

@Global()
@Module({
  imports: [
    RabbitMQConfigModule,
    RabbitMQServiceModule,
  ],
  exports: [RabbitMQConfigModule, RabbitMQServiceModule],
})
export class AppRabbitMQModule { }