import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ProjectsService],
})
export class UsersModule {}
