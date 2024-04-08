import { CrudOptions } from "@dataui/crud";

type UnwantedKeys = "model";
export type CrudOptionsType = Omit<CrudOptions, UnwantedKeys>;

export interface IControllerCrudOptions {
  name: string;
  entity: any;
  crud?: CrudOptionsType;
}
