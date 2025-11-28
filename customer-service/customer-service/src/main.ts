import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Creating Nest application...');
    const app = await NestFactory.create(AppModule);

    console.log('Enabling CORS...');
    // Enable CORS for frontend
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });

    console.log('Setting up global pipes...');
    // ValidationPipe commented out - requires class-transformer package
    // app.useGlobalPipes(new ValidationPipe());

    const port = process.env.PORT ?? 3002;
    console.log(`Starting server on port ${port}...`);
    await app.listen(port);
    console.log(`✓ Customer Service is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to start Customer Service:', error);
    process.exit(1);
  }
}
bootstrap();
