import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './DTOs/CreateInteraction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async queryInteractions(
    filters: {
      leadStatus?: string;
      customerName?: string;
      interactionType?: string;
      startDate?: Date;
      endDate?: Date;
    } = {},
  ) {
    const { leadStatus, customerName, interactionType, startDate, endDate } =
      filters;

    try {
      const interactions = await this.db.interaction.findMany({
        where: {
          type: interactionType,
          lead: {
            status: leadStatus,
            customer: {
              name: customerName,
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
