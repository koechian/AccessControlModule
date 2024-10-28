import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './DTOs/CreateCustomer.dto';
import { CustomerQueryDto } from './DTOs/CustomerQuery.dto';

type UpdateCustomer = {
  name: string;

  email: string;

  phone?: string;

  companyName?: string;

  address?: string;
};

@Injectable()
export class CustomersService {
  constructor(private db: PrismaService) {}
  // Returns all projects from the Projects Table
  async getAll(query: CustomerQueryDto) {
    const filterConditions = {
      where: {
        ...(query.name && {
          name: { contains: query.name, mode: 'insensitive' },
        }),
        ...(query.email && {
          email: { contains: query.email, mode: 'insensitive' },
        }),
        ...(query.companyName && {
          companyName: { contains: query.companyName, mode: 'insensitive' },
        }),
      },
    };

    return this.db.customer.findMany(filterConditions);
  }

  //   Finds and returns one identified customer
  async findOne(username: string) {
    return this.db.user.findMany({
      where: {
        username: username,
      },
    });
  }

  async createCustomer(userDetails: CreateCustomerDto) {
    try {
      const user = await this.db.customer.create({
        data: userDetails,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //   Updates the defined project
  async updateCustomer(body: UpdateCustomer) {
    try {
      await this.db.user.update({
        where: {
          email: body.email,
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
  //   async deleteCustomer(user_id: number) {
  //     try {
  //       // Ensure the user exists before attempting deletion
  //       const user = await this.db.user.findUnique({
  //         where: { id: Number(user_id) },
  //       });

  //       if (!user) {
  //         console.log('User does not exist');
  //         return false;
  //       }

  //       // Get the projectDetails of any related Projects
  //       const projects = await this.db.projectUserLink.findMany({
  //         where: {
  //           userID: user.userid,
  //         },
  //         select: {
  //           projectID: true,
  //         },
  //       });

  //       // Delete any assigned projects from the database
  //       await this.db.projectUserLink.deleteMany({
  //         where: {
  //           user: {
  //             userid: user.userid,
  //           },
  //         },
  //       });

  //       // Safely delete the user
  //       await this.db.user.delete({
  //         where: { id: Number(user_id) },
  //       });

  //       return true;
  //     } catch (e) {
  //       console.log(e);
  //       return false;
  //     }
  //   }
}
