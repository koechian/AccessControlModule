import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('getAllUsers')
  findAll() {
    return 'All Users';
  }

  @Get('getUser/:id')
  getUser(@Param() id: String) {
    console.log(id);
    return `Found one of id ${id['id']}`;
  }
  @Put(':id')
  updateUser(@Param() id: String, @Body() body: any) {
    // Update the project from the Database
    console.log(id);
    return 'Updated Project Details';
  }

  @Post(':id')
  createUser(@Body() body: JSON) {
    // Create a project and add to the database

    console.log(body);
    return 'User Created';
  }

  @Delete(':id')
  deleteUser(@Param() id: String) {
    // Create a project and add to the database

    return `User ${id['id']} has been deleted`;
  }
}
