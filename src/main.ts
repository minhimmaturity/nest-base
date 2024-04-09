import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import expressBasicAuth from "express-basic-auth";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  const user = process.env.SWAGGER_USER || "admin";
  const password = process.env.SWAGGER_PASSWORD || "admin";
  app.use(
    "/api/docs",
    expressBasicAuth({
      challenge: true,
      users: { [user]: password },
    }),
    (req, res, next) => {
      res.setHeader("Cache-Control", "no-store");
      next();
    },
  );

  app.useStaticAssets(join(__dirname, "..", "public"), {
    setHeaders(res) {
      res.setHeader("Cache-Control", "max-age=1209600, no-transform");
    },
  });

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
