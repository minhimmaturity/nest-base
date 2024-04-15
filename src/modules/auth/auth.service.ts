import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthInitDto, LoginDto } from "./dto/auth.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { UserRole } from "../users/users.interface";
import { nanoid } from "nanoid";
import { Request, Response } from "express";
import dayjs from "dayjs";
import getDomainFromUrl from "src/helper/getDomainFromUrl";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Perform a login operation using the provided LoginDto.
   *
   * @param {LoginDto} dto - the data transfer object containing email and password
   * @return {Promise<any>} the login response
   */
  public async login(dto: LoginDto, req: Request, res: Response) {
    console.log(req.headers.referer);
    const { email, password, remember } = dto;
    const user = await this.verifyUserPassword(email, password);
    return this.loginResponse(user, remember);
  }

  /**
   * Verify user password asynchronously.
   *
   * @param {string} email - the user's email
   * @param {string} password - the user's password
   * @return {Promise<User>} the user if the password is valid
   */
  private async verifyUserPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.repo.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * Generates a login response object based on the user details.
   *
   * @param {User} user - the user object containing email, id, name, and role
   * @return {object} an object containing token, refreshToken, email, id, name, and role
   */
  public async loginResponse(user: User, remember: boolean) {
    const { email, id, name } = user;
    const response = {
      token: this.jwtService.sign({
        email,
        id,
        name,
        remember,
      }),
    };

    return {
      ...response,
      email,
      id,
      name,
    };
  }

  /**
   * Initializes the application by creating an admin user if the database is empty.
   *
   * @param {AuthInitDto} dto - the DTO containing the email of the admin user
   * @return {object} an object containing the email and password of the admin user
   */
  public async authInit(
    dto: AuthInitDto,
  ): Promise<{ email: string; password: string }> {
    const { email } = dto;

    const userCount = await this.usersService.count({
      where: {},
    });

    if (userCount > 0) {
      throw new ForbiddenException("The application is already initialized.");
    }

    const password = nanoid();

    await this.usersService.createUser({
      email,
      name: email.split("@")[0],
      password,
      role: UserRole.ADMIN,
    });
    return {
      email,
      password,
    };
  }
}
