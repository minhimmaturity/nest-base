import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { Crud } from "@dataui/crud";

@Crud({
  model: {
    type: User,
  },
  query: {
    limit: 100,
    cache: 200,
  },
  params: {
    id: {
      type: "uuid",
      primary: true,
      field: "id",
    },
  },
})
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(public service: UsersService) {}
}
