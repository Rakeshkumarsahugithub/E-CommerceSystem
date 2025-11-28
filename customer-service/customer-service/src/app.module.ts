import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';
import { RabbitMQConfigModule } from './rabbitmq/rabbitmq.config.module';
import { AppRabbitMQModule } from './rabbitmq/rabbitmq.app.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CustomerModule,
    // RabbitMQConfigModule,
    AppRabbitMQModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
