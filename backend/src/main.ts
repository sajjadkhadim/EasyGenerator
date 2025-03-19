import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response, Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  });


  app.useStaticAssets(join(__dirname, '..', 'public'));

  // app.use((req: Request, res: Response) => {
  //   res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  // });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for user authentication and authorization')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // // Serve the frontend for all unmatched routes
  // app.use((req: Request, res: Response) => {
  //   res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  // });

  await app.listen(3001);
  console.log(`Application is running on: http://localhost:3001`);
  console.log(`Swagger documentation is available on: http://localhost:3001/api`);
}
bootstrap();