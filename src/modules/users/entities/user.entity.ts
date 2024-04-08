import { BaseEntity } from "src/common/dto/baseEntity";
import { Entity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {}
