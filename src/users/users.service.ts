import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}
  // Returns all projects from the Projects Table
  async findAll(limit: Number) {
    return this.db.user.findMany();
  }

  //   Finds and returns one identified project
  async findOne(username: string) {
    return this.db.user.findMany({
      where: {
        username: username,
      },
    });
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
