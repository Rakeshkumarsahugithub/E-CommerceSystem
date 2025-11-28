import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQServiceModule } from './rabbitmq.service.module';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'ecommerce.exchange',
            type: 'topic',
          },
        ],
        uri: configService.get<string>('RABBITMQ_URL'),
        connectionInitOptions: { wait: true },
      }),
      inject: [ConfigService],
    }),
    RabbitMQServiceModule,
  ],
  exports: [RabbitMQModule, RabbitMQServiceModule],
})
export class AppRabbitMQModule { }