import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>) {
    super(repo);
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * Create a new user in the database.
   *
   * @param {CreateUserDto} dto - the data transfer object containing email, name and password
   * @return {Promise<CreateUserDto>} the data transfer object that was passed in
   * @throws {ConflictException} if the email is already in use
   */
  public async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const { email, password, name, role } = dto;
    const newUser = new User();
    newUser.email = email;
    const salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, salt);
    newUser.name = name;
    newUser.role = role;

    const check = await this.repo.count({
      where: {
        email,
      },
    });
    if (check > 0) {
      throw new ConflictException("Email is already in use");
    }
    await this.repo.save(newUser);
    return dto;
  }
}
