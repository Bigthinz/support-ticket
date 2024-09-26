// src/auth/guards/roles.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('Full request object:', request);
    console.log('User object:', user);
    console.log('Required roles:', requiredRoles);

    if (!user) {
      throw new ForbiddenException(
        'User not found in request. This might be an authentication issue.',
      );
    }

    if (typeof user.role === 'undefined') {
      throw new ForbiddenException(
        'User role is undefined. Check your JWT payload and strategy.',
      );
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    console.log('User has required role:', hasRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `User does not have required role. User role: ${
          user.role
        }, Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
