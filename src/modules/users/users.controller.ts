import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { ControllerCrud } from "src/common/decorators/controller-crud.decorator";

@ControllerCrud({
  name: "user",
  entity: User,
})
export class UsersController {
  constructor(public service: UsersService) {}
}
