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
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserGuard } from './guards/guards.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Role } from './guards/roles/roles.decorator';

type UserLogin = {
  username: string;
  password: string;
};

type UserUpdateBody = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phonenumber?: string;
  role?: string;
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
  @Put('updateUser')
  async updateUser(@Response() res: any, @Body() body: UserUpdateBody) {
    // Add the details to be updated as an Object/Body
    if (await this.userService.updateUser(body))
      return res.status(200).json({ message: 'User has been Updated' });

    throw new HttpException(
      'Error updating the project',
      HttpStatus.BAD_GATEWAY,
    );
  }

  @Role('Admin')
  @Post('createUser')
  createUser(@Response() res: any, @Body(ValidationPipe) body: CreateUserDto) {
    // Create a user and add them to the database

    const user = this.userService.createUser(body);
    if (!user) {
      throw new HttpException(
        'Error Creating the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return res.status(200).json({ message: 'User created' });
  }

  @Role('Admin')
  @Delete('deleteID/:id')
  deleteUser(@Param() id: Number) {
    // Create a project and add to the database

    return this.userService.deleteUser(id['id']);
  }
}
