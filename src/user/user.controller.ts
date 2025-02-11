import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('search/:name')
  findName(@Param('name') name: string) {
    return this.userService.findName(name);
  }

  @Post('create')
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedUser: UpdateUserDTO) {
    return this.userService.update(+id, updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
