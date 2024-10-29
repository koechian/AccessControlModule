import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './DTOs/CreateCustomer.dto';
import { CustomerQueryDto } from './DTOs/CustomerQuery.dto';

type UpdateCustomer = {
  name?: string;

  email?: string;

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
          name: { contains: query.name },
        }),
        ...(query.email && {
          email: { contains: query.email },
        }),
        ...(query.companyName && {
          companyName: { contains: query.companyName },
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

  async createCustomer(customerDetails: CreateCustomerDto) {
    try {
      const user = await this.db.customer.create({
        data: customerDetails,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  // returns the number of customers
  async countCustomer() {
    try {
      console.log('pinged');
      return await this.db.customer.count();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  //   Updates the defined project
  async updateCustomer(body: UpdateCustomer) {
    try {
      await this.db.customer.update({
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
  async deleteCustomer(customerId: number): Promise<{ message: string }> {
    // Start a transaction to handle related deletions
    await this.db.$transaction(async (prisma) => {
      // Check if the customer exists
      const customer = await this.db.customer.findUnique({
        where: { id: customerId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Customer with ID ${customerId} not found.`,
        );
      }

      // Delete all interactions related to leads of the customer
      await this.db.interaction.deleteMany({
        where: {
          lead: {
            customerId: customerId,
          },
        },
      });

      // Delete all leads associated with the customer
      await this.db.lead.deleteMany({
        where: {
          customerId: customerId,
        },
      });

      // Delete the customer
      await this.db.customer.delete({
        where: { id: customerId },
      });
    });

    return {
      message: `Customer with ID ${customerId} and all related data have been deleted.`,
    };
  }
}
