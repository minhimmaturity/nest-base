import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  IsEnum,
} from "class-validator";
import { UserRole } from "../users.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password too weak",
  })
  password: string;

  @ApiProperty({ required: true, enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
