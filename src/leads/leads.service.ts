import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeadQueryDto } from './DTOs/LeadQuery.dto';

@Injectable()
export class LeadsService {
  constructor(private db: PrismaService) {}

  async getAllLeads() {
    try {
      const data = await this.db.lead.findMany({
        include: {
          // Include customer information for each lead
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              companyName: true,
              phone: true,
            },
          },
          // Include all interactions related to each lead
          interactions: {
            select: {
              id: true,
              type: true,
              details: true,
              createdAt: true,
            },
          },
        },
      });

      return data;

      //   console.log('Data: ', data);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getAllLeadsQueried(query: LeadQueryDto) {
    try {
      const data = await this.db.lead.findMany({
        include: {
          // Include customer information for each lead
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              companyName: true,
              phone: true,
            },
          },
          // Include all interactions related to each lead
          interactions: {
            select: {
              id: true,
              type: true,
              details: true,
              createdAt: true,
            },
          },
        },
        where: {
          status: query.status ? { contains: query.status } : undefined,
          customer: {
            name: query.customerName
              ? { contains: query.customerName }
              : undefined,
            email: query.customerEmail
              ? { contains: query.customerEmail }
              : undefined,
            companyName: query.companyName
              ? { contains: query.companyName }
              : undefined,
          },
        },
      });

      console.log('Data: ', data);

      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getLeadsCount() {
    try {
      return await this.db.lead.count();
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getConvertedLeadsCount() {
    try {
      return await this.db.lead.count({
        where: {
          status: 'CONVERTED',
        },
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
