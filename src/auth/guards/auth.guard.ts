import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtToken: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    // Split at 'Bearer #####' and keep the token
    const token = auth?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    // Check if the token is valid, if not, throw an error
    try {
      await this.jwtToken.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Expired token');
    }
  }
}
