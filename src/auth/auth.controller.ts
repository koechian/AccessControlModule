import { Body, Controller, Post } from '@nestjs/common';
import { UserLogin } from './dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() body: UserLogin) {
    const result = await this.auth.authenticate(body);

    return result;
  }

  @Post('logout')
  async logout(@Body() body: { token: string }) {
    const result = await this.auth.logout(body);
    return result;
  }
}
