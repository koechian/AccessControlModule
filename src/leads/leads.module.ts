import { Module } from '@nestjs/common';
import { LeadController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  controllers: [LeadController],
  providers: [LeadsService],
})
export class LeadsModule {}
