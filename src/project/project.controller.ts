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
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Post('create')
  create(@Body() project: CreateProjectDTO) {
    return this.projectService.create(project);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updatedProject: CreateProjectDTO) {
  //   // return this.projectService.update(+id, updatedProject);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
