import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
  @ApiProperty({ required: true })
  @IsBoolean()
  @IsOptional()
  remember: boolean;
}

export class AuthInitDto {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}
