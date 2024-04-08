import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/guards/auth.guard";
import { AuthService } from "./auth.service";
import { AuthInitDto, LoginDto } from "./dto/auth.dto";
import { Response } from "express";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Public()
  @Post("init")
  authInit(@Body() dto: AuthInitDto) {
    return this.authService.authInit(dto);
  }
}
