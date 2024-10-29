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
import { UpdateInteractionDto } from './DTOs/UpdateInteraction.dto';
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
}
