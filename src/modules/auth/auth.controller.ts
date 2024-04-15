import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/guards/auth.guard";
import { AuthService } from "./auth.service";
import { AuthInitDto, LoginDto } from "./dto/auth.dto";
import { Request, Response } from "express";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.login(dto, req, res);
  }

  @Public()
  @Post("init")
  authInit(@Body() dto: AuthInitDto) {
    return this.authService.authInit(dto);
  }
}
