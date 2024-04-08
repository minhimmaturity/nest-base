import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { ControllerCrud } from "src/common/decorators/controller-crud.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@ControllerCrud({
  name: "users",
  entity: User,
})
export class UsersController {
  constructor(public service: UsersService) {}
}
