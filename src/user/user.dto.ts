/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
