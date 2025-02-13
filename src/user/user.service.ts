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
  async findAll(query) {
    console.log(query, 'sssssssssssssssssss');

    try {
      const allUser = await this.usersRepository
        .createQueryBuilder('user')
        .getMany();

      return allUser;
    } catch (error) {
      throw new HttpException(
        `Error finding user : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Display single user by using id
  // async findOne(user_id: number) {
  //   try {
  //     const singleUser = await this.usersRepository.findOneBy({ user_id });
  //     if (singleUser) {
  //       return singleUser;
  //     }
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   } catch (err) {
  //     throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // Display single user by using id, Repository API
  async findOneUserById(user_id: number) {
    try {
      const singleUser = await this.usersRepository
        .createQueryBuilder('user')
        .where('user.user_id = :userId', { userId: user_id })
        .getOneOrFail();

      return singleUser;
    } catch (err) {
      throw new HttpException(`${err}`, HttpStatus.BAD_REQUEST);
    }
  }

  // Display single user by using name
  async findUserByName(name: string, sort: string) {
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

  // We use the first function to create user as it is to just insert... personal preferences

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

  // Create new user using QueryBuilder
  async createUser(userDTO: CreateUserDTO) {
    try {
      const newUser = this.usersRepository.create(userDTO);
      const createdUser = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(newUser)
        .execute();
      // .save(newUser);
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

  // Update user using QueryBuilder
  async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
    try {
      const updated = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(updateUserDTO)
        .execute();
      // .update(id, updateUserDTO);
      if (updated) {
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
      if (await this.findOneUserById(id)) {
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

  // Delete User using QueryBuilder
  async removeUser(id: number) {
    try {
      const removedUser = await this.usersRepository
        .createQueryBuilder()
        .delete()
        .from(Users)
        .where('user_id = :id', { id })
        .execute();
      if (removedUser) {
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
