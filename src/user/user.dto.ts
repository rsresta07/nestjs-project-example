import { IsOptional, IsString } from 'class-validator';

// This is for the Create User
export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

// This is for the Update user details
export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
