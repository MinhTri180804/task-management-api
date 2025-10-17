import { NestFactory } from '@nestjs/core';
import { StrictValidationPipe } from '@shared/pipes/strict-validation.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new StrictValidationPipe());
  await app.listen(process.env.APP_PORT ?? 3000);
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.APP_PORT}`,
  );
}
bootstrap();
