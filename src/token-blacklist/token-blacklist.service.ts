import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenBlacklistService {
  constructor(private db: PrismaService) {}

  // In a production server this would robably be a REDIS Cache in stead of a DB Call for efficiency and latency

  // adds a token to the list of blacklisted tokens
  async blacklistToken(token: string) {
    try {
      const result = await this.db.blacklistedTokens.create({
        data: {
          token: token,
        },
      });
      return true;
    } catch (e) {
      console.log(e);

      throw new HttpException(
        `Database Error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Checks if a provided token has been blacklisted
  async isTokenBlacklisted(token: string) {
    // Check if the database contains the blacklisted token
    const result = await this.db.blacklistedTokens.findMany({
      where: {
        token: token,
      },
    });

    if (result.length > 0) {
      return true;
    }

    return false;
  }
}
