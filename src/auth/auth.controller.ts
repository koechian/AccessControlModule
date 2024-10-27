import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { UserLogin } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { TokenBlacklistService } from 'src/token-blacklist/token-blacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private blacklister: TokenBlacklistService,
  ) {}

  @Post('login')
  async login(@Body() body: UserLogin) {
    console.log(body);
    const result = await this.auth.authenticate(body);

    return result;
  }

  @Post('logout')
  async logout(@Response() res: any, @Request() req: any) {
    const token = req.headers['authorization']?.split(' ')[1];
    this.blacklister.blacklistToken(token);

    return res.status(200).json({ message: 'Logged out' });
  }
}
