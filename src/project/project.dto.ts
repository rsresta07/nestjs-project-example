import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  projectName: string;

  @IsString()
  projectDescription: string;

  @IsNumber()
  user: number;
}

export class UpdateProjectDTO {
  @IsString()
  projectName?: string;

  @IsString()
  projectDescription?: string;

  @IsNumber()
  userId?: number;
}
