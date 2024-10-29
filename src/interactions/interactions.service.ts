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
}
