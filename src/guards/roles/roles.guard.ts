import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]
    )
    if(!requireRoles) return true;
    const request = context.switchToHttp().getRequest<{headers:Record<string,string>}>();
    const userRole =request.headers['x-user-role'] as Role;
    return requireRoles.includes(userRole);
    return true;
  }
}
