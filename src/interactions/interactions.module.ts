import { Module } from '@nestjs/common';
import { InteractionController } from './interactions.controller';
import { InteractionsService } from './interactions.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InteractionController],
  providers: [InteractionsService, PrismaService],
})
export class InteractionsModule {}
