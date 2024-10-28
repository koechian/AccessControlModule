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
import { CreateCustomerDto } from './DTOs/CreateCustomer.dto';
import { CustomerQueryDto } from './DTOs/CustomerQuery.dto';
import { UpdateCustomerDto } from './DTOs/UpdateCustomer.dto';
import { CustomersService } from './customers.service';

// customer.controller.ts
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomersService) {}

  // Create a new customer
  @Post()
  createCustomer(
    @Response() res: any,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    const customer = this.customerService.createCustomer(createCustomerDto);

    if (customer) {
      return res.status(200).json('Customer Created Successfully');
    }
    throw new HttpException('Error getting Projects', HttpStatus.BAD_GATEWAY);
  }

  // Get all customers (with optional search and filter parameters)
  @Get()
  getAllCustomers(@Query() query: CustomerQueryDto) {
    return this.customerService.getAll(query);
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
