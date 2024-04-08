import { Crud } from "@dataui/crud";
import { Controller, applyDecorators } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { crudConfig } from "src/configs"; // Assuming you have a valid import here
import { IControllerCrudOptions } from "../type";

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
  ];

  return applyDecorators(...decorators);
}
