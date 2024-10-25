import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // Returns all projects from the Projects Table
  async findAll(limit: Number) {
    return `${limit} Users returned`;
  }

  //   Finds and returns one identified project
  async findOne(id: Number) {
    return `Found user ${id}`;
  }

  //   Creates a new project from the Data Object
  async createUser(userDetails: CreateUserDto) {
    return 'Created user';
  }

  //   Updates the defined project
  async updateUser(id: Number) {
    return `Updated user ${id}`;
  }

  //   Deletes the defined project from the database
  async deleteUser(id: Number) {
    return `User ${id} deleted`;
  }

  // Deletes multiple projects from the database at a go
  async deleteUsers(ids: Number[]) {}
}
