import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { TokenBlacklistService } from './token-blacklist/token-blacklist.service';
import { JwtMiddleware } from './token-blacklist/jwt.middleware';
import { CustomersModule } from './customers/customers.module';
import { LeadsModule } from './leads/leads.module';
import { InteractionsModule } from './interactions/interactions.module';

@Module({
  imports: [ProjectsModule, UsersModule, ConfigModule.forRoot(), AuthModule, CustomersModule, LeadsModule, InteractionsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, TokenBlacklistService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/users/*', '/projects/*');
  }
}
