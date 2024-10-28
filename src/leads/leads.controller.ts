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
import { CreateLeadDto } from './DTOs/CreateLead.dto';
import { LeadQueryDto } from './DTOs/LeadQuery.dto';
import { UpdateLeadDto } from './DTOs/UpdateLead.dto';

// lead.controller.ts
@Controller('leads')
export class LeadController {
  // Create a new lead associated with a customer
  @Post()
  createLead(@Body() createLeadDto: CreateLeadDto) {}

  // Get all leads (with optional search and filter parameters)
  @Get()
  getAllLeads(@Query() query: LeadQueryDto) {
    /* ... */
  }

  // Get a single lead by ID
  @Get(':id')
  getLeadById(@Param('id') id: string) {
    /* ... */
  }

  // Update lead details, such as status
  @Put(':id')
  updateLead(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    /* ... */
  }

  // Delete a lead
  @Delete(':id')
  deleteLead(@Param('id') id: string) {
    /* ... */
  }
}
