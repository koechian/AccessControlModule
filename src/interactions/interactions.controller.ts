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
    // Write the code to create a new interaction
    const result =
      await this.interactionService.createInteraction(createInteractionDto);

    if (result) return res.status(201).json({ message: 'Interaction created' });
    else
      throw new HttpException(
        'Error Creating the user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  // Get all interactions for a specific lead
  @Get('lead/:leadId')
  getInteractionsByLeadId(@Param('leadId') leadId: string) {
    /* ... */
  }

  // Get a single interaction by ID
  @Get(':id')
  getInteractionById(@Param('id') id: string) {
    /* ... */
  }

  // Update an interaction
  @Put(':id')
  updateInteraction(
    @Param('id') id: string,
    @Body() updateInteractionDto: UpdateInteractionDto,
  ) {
    /* ... */
  }

  // Delete an interaction
  @Delete(':id')
  deleteInteraction(@Param('id') id: string) {
    /* ... */
  }
}
