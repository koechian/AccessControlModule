import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateLeadDto } from './DTOs/CreateLead.dto';
import { LeadQueryDto } from './DTOs/LeadQuery.dto';
import { UpdateLeadDto } from './DTOs/UpdateLead.dto';
import { LeadsService } from './leads.service';

// lead.controller.ts
@Controller('leads')
export class LeadController {
  constructor(private LeadsService: LeadsService) {}
  // Create a new lead associated with a customer
  @Post()
  createLead(@Body() createLeadDto: CreateLeadDto) {}

  // Get all leads (with optional search and filter parameters)
  @Get('getLeads')
  async getAllLeads(@Response() res: any, @Query() query: LeadQueryDto) {
    const result = await this.LeadsService.getAllLeads();

    if (result) {
      res.status(201).json(result);
    } else {
      throw new HttpException(
        'Error fetching customers list',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('queryLeads')
  async getAllLeadsQueried(@Response() res: any, @Query() query: LeadQueryDto) {
    const result = await this.LeadsService.getAllLeadsQueried(query);

    if (result) {
      res.status(201).json(result);
    } else {
      throw new HttpException(
        'Error fetching customers list',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('getLeadsCount')
  async getLeadsCount(@Response() res: any) {
    const result = await this.LeadsService.getLeadsCount();

    if (result) {
      res.status(201).json(result);
    } else {
      throw new HttpException('No Count', HttpStatus.NOT_FOUND);
    }
  }
  @Get('getConvertedLeadsCount')
  async getconvertedLeadsCount(@Response() res: any) {
    const result = await this.LeadsService.getConvertedLeadsCount();

    if (result) {
      res.status(201).json(result);
    } else {
      throw new HttpException('No Count', HttpStatus.NOT_FOUND);
    }
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
