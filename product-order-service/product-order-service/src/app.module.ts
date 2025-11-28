import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { RabbitMQConfigModule } from './rabbitmq/rabbitmq.config.module';
import { AppRabbitMQModule } from './rabbitmq/rabbitmq.app.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProductModule,
    OrderModule,
    CartModule,
    // RabbitMQConfigModule,
    AppRabbitMQModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
