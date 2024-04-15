import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { ControllerCrud } from "src/common/decorators/controller-crud.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Override } from "@dataui/crud";
import { Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@ControllerCrud({
  name: "users",
  entity: User,
})
export class UsersController {
  constructor(public service: UsersService) {}
  @Override("createOneBase")
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }
}
