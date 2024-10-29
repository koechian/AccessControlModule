import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { CreateInteractionDto } from './DTOs/CreateInteraction.dto';
import { InteractionsService } from './interactions.service';

// interaction.controller.ts
@Controller('interactions')
export class InteractionController {
  constructor(private interactionService: InteractionsService) {}

  // Create a new interaction associated with a lead
  @Post('newInteraction')
  async createInteraction(
    @Response() res: any,
    @Body() createInteractionDto: CreateInteractionDto,
  ) {
    const result =
      await this.interactionService.createInteraction(createInteractionDto);

    if (result) return res.status(201).json({ message: 'Interaction created' });
    else
      throw new HttpException(
        'Error Creating the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  // Get all interactions and related details
  @Get('getInteractions')
  async getInteractionsByLeadId(
    @Response() res: any,
    @Param('leadId') leadId: string,
  ) {
    const result = await this.interactionService.getAllInteractions();

    if (result) return res.status(201).json(result);
    else
      throw new HttpException(
        'Error getting interactions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  @Get('getInteractionsCount')
  async getInteractionsCount() {
    const result = await this.interactionService.totalInteractions();
    return result;
  }

  @Get('queryInteractions')
  async queryInteractions(
    @Query('leadStatus') leadStatus: string,
    @Query('customerName') customerName: string,
    @Query('customerEmail') customerEmail: string,
    @Query('companyName') companyName: string,
    @Query('interactionType') interactionType: string,
    @Response() res: any,
  ) {
    try {
      const filters = {
        customerName,
        leadStatus,
        customerEmail,
        companyName,
        interactionType,
      };

      const interactions =
        await this.interactionService.queryInteractions(filters);
      return res.status(HttpStatus.OK).json(interactions);
    } catch (error) {
      console.error('Error fetching interactions:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Could not retrieve interactions' });
    }
  }
}
