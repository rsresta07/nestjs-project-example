import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // List all the user details
  async findAll() {
    try {
      const allUser = await this.usersRepository.find();
      if (allUser) {
        return allUser;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        `Error finding user : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Display single user by using id
  async findOne(user_id: number) {
    try {
      const singleUser = await this.usersRepository.findOneBy({ user_id });
      if (singleUser) {
        return singleUser;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
    }
  }

  // Display single user by using name
  async findName(name: string, sort: string) {
    const user = await this.usersRepository.findOneBy({ name });
    try {
      if (user) {
        return user;
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      throw new HttpException(
        `Error finding user using the name: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Create new user
  async create(userDTO: CreateUserDTO) {
    try {
      const newUser = this.usersRepository.create(userDTO);
      const createdUser = await this.usersRepository.save(newUser);
      return createdUser;
    } catch (err) {
      throw new HttpException(
        `Error creating user: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Update user
  async update(id: number, updateUserDTO: UpdateUserDTO) {
    try {
      const updated = await this.usersRepository.update(id, updateUserDTO);
      if (updated?.affected ?? 0 > 0) {
        return {
          message: 'User updated successfully',
        };
      }
    } catch (error) {
      throw new HttpException(
        `Error updating user: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Delete user
  async remove(id: number) {
    try {
      if (await this.findOne(id)) {
        await this.usersRepository.delete(id);
        return {
          message: 'User deleted successfully',
        };
      }
      throw new NotFoundException(`User with ID ${id} not found`);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Error deleting user: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
