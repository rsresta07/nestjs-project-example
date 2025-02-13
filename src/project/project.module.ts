import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UserService } from 'src/user/user.service';
import { Users } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Users])],
  controllers: [ProjectController],
  providers: [ProjectService, UserService],
})
export class ProjectModule {}
