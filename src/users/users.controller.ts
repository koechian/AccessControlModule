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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGuard } from './guards/guards.guard';
import { permission } from 'process';
import { RolesGuard } from './guards/roles/roles.guard';
import { Role } from './guards/roles/roles.decorator';

type UserLogin = {
  username: string;
  password: string;
};

@Controller('users')
@UseGuards(RolesGuard)
@UseGuards(UserGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Role('Admin')
  @Role('Project Manager')
  @Get('getAllUsers')
  findAll(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: Number,
  ) {
    return this.userService.findAll(limit);
  }

  @Role('Admin')
  @Get('getUser')
  getUser(@Body() loginDetails: UserLogin) {
    const user = this.userService.findOne(loginDetails.username);

    if (!user) {
      throw new NotFoundException('No such user exists');
    }

    return user;
  }

  @Role('Admin')
  @Put('updateUser/:id')
  async updateUser(@Param() id: Number, @Body() body: any) {
    // Update the project from the Database
    const user = await this.userService.updateUser(id['id']);

    if (!user) {
      throw new NotFoundException('No such user exists');
    }
  }

  @Role('Admin')
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

  @Role('Admin')
  @Delete('deleteID/:id')
  deleteUser(@Param() id: Number) {
    // Create a project and add to the database

    return this.userService.deleteUser(id['id']);
  }
}
