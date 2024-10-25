import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('getAllUsers')
  findAll(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: Number,
  ) {
    return this.userService.findAll(limit);
  }

  @Get('getUser/:id')
  getUser(@Param() id: Number) {
    const user = this.userService.findOne(id['id']);

    if (!user) {
      throw new NotFoundException('No such user exists');
    }

    return user;
  }
  @Put('updateUser/:id')
  async updateUser(@Param() id: Number, @Body() body: any) {
    // Update the project from the Database
    const user = await this.userService.updateUser(id['id']);

    if (!user) {
      throw new NotFoundException('No such user exists');
    }
  }

  @Post('createUser')
  createUser(@Body(ValidationPipe) body: CreateUserDto) {
    // Create a project and add to the database

    console.log(body);
    const user = this.userService.createUser(body);
    if (!user) {
      throw new HttpException(
        'Error Creating the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return user;
  }

  @Delete('deleteID/:id')
  deleteUser(@Param() id: Number) {
    // Create a project and add to the database

    return this.userService.deleteUser(id['id']);
  }
}
