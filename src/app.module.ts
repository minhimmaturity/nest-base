import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { authConfig } from "./configs";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { CombineModule } from "./modules/combine.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + "/**/*.entity.{js,ts}"],
      synchronize: true,
      ssl: Boolean(process.env.DB_SSL), // run dev local connect to cloud database
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      exclude: ["/api*"],
    }),
    JwtModule.register({
      global: true,
      secret: authConfig.jwtConstants.secret,
      signOptions: { expiresIn: "24h" },
    }),
    CombineModule,
  ],
})
export class AppModule {}
