import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/auth.dto";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
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
  public async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.verifyUserPassword(email, password);

    return this.loginResponse(user);
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
  public async loginResponse(user: User) {
    const { email, id, name } = user;
    const response = {
      token: this.jwtService.sign({
        email,
        id,
        name,
      }),
      refreshToken: this.jwtService.sign({ id }, { expiresIn: "30d" }),
    };

    return {
      ...response,
      email,
      id,
      name,
    };
  }
}
