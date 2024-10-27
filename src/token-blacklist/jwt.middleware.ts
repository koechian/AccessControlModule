import { Injectable, NestMiddleware } from '@nestjs/common';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private tokenBlacklistService: TokenBlacklistService) {}

  async use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (await this.tokenBlacklistService.isTokenBlacklisted(token)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }
}
