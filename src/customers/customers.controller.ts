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
  @Post('createCustomer')
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
  @Get('getCustomers')
  async getAllCustomers(@Query() query: CustomerQueryDto) {
    return await this.customerService.getAll(query);
  }

  // Update customer details
  @Put('updateCustomer/:id')
  async updateCustomer(
    @Response() res: any,
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    // Add the details to be updated as an Object/Body
    if (await this.customerService.updateCustomer(updateCustomerDto))
      return res.status(200).json({ message: 'User has been Updated' });

    throw new HttpException(
      'Error updating the project',
      HttpStatus.BAD_GATEWAY,
    );
  }

  // return customers count
  @Get('customersCount')
  async getCustomersCount(@Response() res: any) {
    const result = await this.customerService.countCustomer();

    if (result) return res.status(201).json(result);
    else
      throw new HttpException(
        'Error Deleting the customer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }

  // Delete a customer
  @Delete('deleteCustomer/:id')
  async deleteUser(@Response() res: any, @Param() id: string) {
    if (await this.customerService.deleteCustomer(id['id']))
      return res.status(200).json({ message: 'Customer Deleted' });
    else
      throw new HttpException(
        'Error Deleting the customer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
