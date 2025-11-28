import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const url = configService.get<string>('RABBITMQ_URL');
        console.log('Connecting to RabbitMQ at:', url);
        return {
          exchanges: [
            {
              name: 'ecommerce.exchange',
              type: 'topic',
            },
          ],
          uri: configService.get<string>('RABBITMQ_URL'),
          // connectionInitOptions: { wait: true },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQConfigModule { }