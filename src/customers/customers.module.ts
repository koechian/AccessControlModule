import { Module } from '@nestjs/common';
import { CustomerController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService, PrismaService],
})
export class CustomersModule {}
