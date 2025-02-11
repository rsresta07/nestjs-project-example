import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async findAll() {
    try {
      const allProject = await this.projectRepository.find();
      if (allProject) {
        return allProject;
      }
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(error);
      throw new HttpException('Error finding project', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const singleProject = await this.projectRepository.findOneBy({ id });
      if (singleProject) {
        return singleProject;
      }
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error finding project using the id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createProjectDTO: CreateProjectDTO) {
    try {
      const newProject = this.projectRepository.create(createProjectDTO);
      const createdProject = await this.projectRepository.save(newProject);
      return createdProject;
    } catch (err) {
      throw new HttpException(
        `Error creating project: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updatedProjectDTO: CreateProjectDTO) {
    let project = await this.findOne(id);
    try {
      const updatedProject = { ...project, ...updatedProjectDTO };
      project = updatedProject;
      const updated = await this.projectRepository.update(id, project);
      if (updated?.affected ?? 0 > 0) {
        return {
          message: 'Project updated successfully',
        };
      }
    } catch (error) {
      throw new HttpException(
        `Error updating project: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      if (await this.findOne(id)) {
        await this.projectRepository.delete(id);
        return {
          message: 'Project deleted successfully',
        };
      }
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Error deleting project: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
