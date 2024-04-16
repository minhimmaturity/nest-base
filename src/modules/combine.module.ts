import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  // Auto generate module import.
  imports: [
    // Default module import.
    AuthModule,
    UsersModule,
  ],
})
export class CombineModule {}
