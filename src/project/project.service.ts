import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './project.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private userService: UserService,
  ) {}

  async findAll() {
    try {
      const allProject = await this.projectRepository
        .createQueryBuilder('project')
        .getMany();
      return allProject;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error finding project', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneProjectById(projectId: number) {
    try {
      const singleProject = await this.projectRepository
        .createQueryBuilder('project')
        .where('project.project_id = :projectId', { projectId })
        .getOneOrFail();
      return singleProject;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error finding project using the id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createProject(projectDTO: CreateProjectDTO) {
    try {
      const user = await this.userService.findOneUserById(projectDTO.user);
      if (user != null) {
        const newProject = this.projectRepository.create({
          ...projectDTO,
          user: user,
        });
        const createdProject = await this.projectRepository.save(newProject);
        return createdProject;
      }
    } catch (err) {
      if (err instanceof HttpException) {
        // Handle specific error type
        throw new HttpException(err.message, err.getStatus());
      }
      throw new HttpException(
        `Error creating project: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async update(id: number, updatedProjectDTO: CreateProjectDTO) {
  //   let project = await this.findOne(id);
  //   try {
  //     const updatedProject = { ...project, ...updatedProjectDTO };
  //     project = updatedProject;
  //     const updated = await this.projectRepository.update(id, project);
  //     if (updated?.affected ?? 0 > 0) {
  //       return {
  //         message: 'Project updated successfully',
  //       };
  //     }
  //   } catch (error) {
  //     throw new HttpException(
  //       `Error updating project: ${error}`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async removeProject(id: number) {
    try {
      const removedProject = await this.projectRepository
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where('project_id = :id', { id })
        .execute();
      if (removedProject) {
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
