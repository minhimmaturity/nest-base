import { Crud } from "@dataui/crud";
import { Controller, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { crudConfig } from "src/configs"; // Assuming you have a valid import here
import { IControllerCrudOptions } from "../type";
import { AuthGuard } from "src/guards/auth.guard";

export function ControllerCrud<T>(
  options: IControllerCrudOptions,
): ClassDecorator {
  const { entity, name, crud } = options;

  // Assuming query is defined in your crudConfig
  const query = crudConfig ? crudConfig.query : {};

  const decorators = [
    Crud({
      model: {
        type: entity,
      },
      query,
      params: {
        id: {
          type: "uuid",
          primary: true,
          field: "id",
        },
      },
      ...crud,
    }),
    ApiTags(name),
    Controller(name),
    ApiConsumes("application/json"),
    UseGuards(AuthGuard),
    ApiBearerAuth(),
  ];
  return applyDecorators(...decorators);
}
