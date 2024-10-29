import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './DTOs/CreateInteraction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { contains } from 'class-validator';

@Injectable()
export class InteractionsService {
  constructor(private readonly db: PrismaService) {}

  async createInteraction(interaction: CreateInteractionDto) {
    try {
      await this.db.interaction.create({
        data: {
          leadId: interaction.leadId,
          type: interaction.type,
          details: interaction.details,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllInteractions() {
    try {
      const interactions = await this.db.interaction.findMany({
        include: {
          lead: {
            include: {
              customer: true,
            },
          },
        },
      });
      return interactions;
    } catch (error) {
      console.error('Error fetching interactions:', error);
      throw new Error('Could not retrieve interactions');
    }
  }

  async totalInteractions() {
    try {
      const totalInteractions = await this.db.interaction.count();
      return totalInteractions;
    } catch (error) {
      console.error('Error fetching total interactions:', error);
      throw new Error('Could not retrieve total interactions');
    }
  }

  async queryInteractions(
    filters: {
      leadStatus?: string;
      customerName?: string;
      interactionType?: string;
      companyName?: string;
      customerEmail?: string;
    } = {},
  ) {
    const {
      leadStatus,
      customerName,
      interactionType,
      companyName,
      customerEmail,
    } = filters;

    try {
      const interactions = await this.db.interaction.findMany({
        where: {
          type: interactionType ? { contains: interactionType } : undefined,
          lead: {
            status: leadStatus ? { contains: leadStatus } : undefined,
            customer: {
              name: customerName ? { contains: customerName } : undefined,
              email: customerEmail ? { contains: customerEmail } : undefined,
              companyName: companyName ? { contains: companyName } : undefined,
            },
          },
        },
        include: {
          lead: {
            include: {
              customer: true,
            },
          },
        },
      });
      return interactions;
    } catch (error) {
      console.error('Error fetching interactions:', error);
      throw new Error('Could not retrieve interactions');
    }
  }
}
