import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';

// export const Role = Reflector.createDecorator<string>();
export const Role = (...roles: string[]) => SetMetadata('roles', roles);
