import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtToken: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    // Split at 'Bearer #####' and keep the token
    const token = auth?.split(' ')[1];

    // Get the user object from the JWT
    const user = this.jwtToken.decode(token);

    if (!token) {
      throw new UnauthorizedException();
    }

    // Check if the token and permissions are valid, if not, throw an error
    try {
      await this.jwtToken.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Expired token');
    }
  }
}
