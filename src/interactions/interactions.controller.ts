import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateInteractionDto } from './DTOs/CreateInteraction.dto';
import { UpdateInteractionDto } from './DTOs/UpdateInteraction.dto';

// interaction.controller.ts
@Controller('interactions')
export class InteractionController {
  // Create a new interaction associated with a lead
  @Post()
  createInteraction(@Body() createInteractionDto: CreateInteractionDto) {
    /* ... */
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
