import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  // Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOneProjectById(@Param('id') id: string) {
    return this.projectService.findOneProjectById(+id);
  }

  @Post('create')
  createProject(@Body() project: CreateProjectDTO) {
    return this.projectService.createProject(project);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updatedProject: CreateProjectDTO) {
  //   // return this.projectService.update(+id, updatedProject);
  // }

  @Delete(':id')
  removeProject(@Param('id') id: string) {
    return this.projectService.removeProject(+id);
  }
}
