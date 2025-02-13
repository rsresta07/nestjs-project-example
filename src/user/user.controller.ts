import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { query } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all the user details
  @Get()
  findAll(@Query() query: string) {
    return this.userService.findAll(query);
  }

  /**
   * get single user details by id
   * Request : GET
   * use `localhost:3000/users/1`
   */
  @Get(':id')
  findOneUserById(@Param('id') id: string) {
    return this.userService.findOneUserById(+id);
  }

  /**
   * get single user details by name
   * Request : GET
   * use `localhost:3000/users/search/John`
   */
  @Get('search')
  findUserByName(@Query('name') name: string, @Query('sort') sort: string) {
    return this.userService.findUserByName(name, sort);
  }

  /**
   * create (post) new user
   * Request : POST
   * use `localhost:3000/users/create`
   */
  @Post('create')
  createUser(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  /**
   * update (put) user by id
   * Request : PUT
   * use `localhost:3000/users/1`
   */
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDTO) {
    return this.userService.update(+id, updatedUser);
  }

  /**
   * delete user by id
   * Request : DELETE
   * use `localhost:3000/users/1`
   */
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
