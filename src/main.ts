import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .setTitle("Nest Base API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);
  app.getHttpAdapter().getInstance().disable("x-powered-by");
  app.enableCors();

  await app.listen(+process.env.PORT || 3000);
}
bootstrap();
