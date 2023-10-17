import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import * as oracledb from 'oracledb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Initialize the Oracle Database connection pool
  await oracledb.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectString: `(DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.DB_HOST})(PORT = ${process.env.DB_PORT}))
      (CONNECT_DATA=
        (SERVER=DEDICATED)
        (SERVICE_NAME = ${process.env.DB_SERVICE_NAME})
      )
    )`,
    poolMin: 1,
    poolMax: 10,
  });

  await app.listen(3000, () =>
    console.log(`App started on http://localhost:3000`),
  );
}
bootstrap();
