import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  matchRoles(role: string, expectedRole: string) {
    return role === expectedRole;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // Split the auth token to get the User role as we did before
    const token = request.headers.authorization?.split(' ')[1];
    const role = this.jwtService.decode(token).role;

    const expectedRoles = this.reflector.get(Role, context.getHandler());

    if (!role) throw new UnauthorizedException();

    return this.matchRoles(role, expectedRoles);
  }
}
