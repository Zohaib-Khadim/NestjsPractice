import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips any properties that do not have any decorators or missing in the DTO
    forbidNonWhitelisted: true, // throws an error if non-whitelisted properties are present or if unknown properties are sent in the request
    transform: true, // automatically transforms payloads to be objects typed according to their DTO classes 
  }))
  await app.listen(3000);
  app.enableShutdownHooks();
}
bootstrap();
