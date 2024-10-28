import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

type UserUpdateBody = {
  userid?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phonenumber?: string;
  role?: string;
};

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}
  // Returns all projects from the Projects Table
  async findAll(limit: Number) {
    return this.db.user.findMany({
      omit: { password: true },
      orderBy: {
        firstname: 'asc',
      },
    });
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
    try {
      const user = await this.db.user.create({
        data: userDetails,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  //   Updates the defined project
  async updateUser(body: UserUpdateBody) {
    try {
      await this.db.user.update({
        where: {
          userid: body.userid,
        },
        data: body,
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //   Deletes the defined project from the database
  async deleteUser(user_id: number) {
    try {
      // Ensure the user exists before attempting deletion
      const user = await this.db.user.findUnique({
        where: { id: Number(user_id) },
      });

      if (!user) {
        console.log('User does not exist');
        return false;
      }

      // Get the projectDetails of any related Projects
      const projects = await this.db.projectUserLink.findMany({
        where: {
          userID: user.userid,
        },
        select: {
          projectID: true,
        },
      });

      // Delete any assigned projects from the database
      await this.db.projectUserLink.deleteMany({
        where: {
          user: {
            userid: user.userid,
          },
        },
      });

      // Safely delete the user
      await this.db.user.delete({
        where: { id: Number(user_id) },
      });

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
