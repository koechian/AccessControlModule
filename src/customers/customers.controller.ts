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
import { CreateCustomerDto } from './DTOs/CreateCustomer.dto';
import { CustomerQueryDto } from './DTOs/CustomerQuery.dto';
import { UpdateCustomerDto } from './DTOs/UpdateCustomer.dto';

// customer.controller.ts
@Controller('customers')
export class CustomerController {
  // Create a new customer
  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    /* ... */
  }

  // Get all customers (with optional search and filter parameters)
  @Get()
  getAllCustomers(@Query() query: CustomerQueryDto) {
    /* ... */
  }

  // Get a single customer by ID
  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    /* ... */
  }

  // Update customer details
  @Put(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    /* ... */
  }

  // Delete a customer
  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    /* ... */
  }
}
