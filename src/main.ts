import { NestFactory, Reflector } from '@nestjs/core';
import { StrictValidationPipe } from '@shared/pipes/strict-validation.pipe';
import { AppModule } from './app.module';
import { AllExceptionFilter } from '@shared/filters/all-exception.filter';
import { ResponseTransformInterceptor } from '@shared/interceptor/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new StrictValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor(new Reflector()));
  await app.listen(process.env.APP_PORT ?? 3000);
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.APP_PORT}`,
  );
}
bootstrap();
