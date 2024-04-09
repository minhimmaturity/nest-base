import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { authConfig } from "src/configs";
const PUBLIC = "PUBLIC";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(Reflector) private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (this.reflector.get(PUBLIC, context.getHandler())) return true;
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request): Promise<boolean> {
    try {
      let token = request.cookies.token;
      if (!token) {
        return false;
      }
      token = token.replace("Bearer ", "");
      await this.jwtService.verify(token, {
        secret: authConfig.jwtConstants.secret,
      });
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

export const Public = () => SetMetadata(PUBLIC, true);
