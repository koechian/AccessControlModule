import { Module } from '@nestjs/common';
import { LeadController } from './leads.controller';
import { LeadsService } from './leads.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LeadController],
  providers: [LeadsService, PrismaService],
})
export class LeadsModule {}
