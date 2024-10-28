import { Module } from '@nestjs/common';
import { InteractionController } from './interactions.controller';
import { InteractionsService } from './interactions.service';

@Module({
  controllers: [InteractionController],
  providers: [InteractionsService],
})
export class InteractionsModule {}
