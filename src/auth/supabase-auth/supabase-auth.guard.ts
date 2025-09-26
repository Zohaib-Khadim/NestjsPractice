import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import {Request} from 'express'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private configService:ConfigService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return false;
    }

      const jwtSecret = this.configService.get<string>('SUPABASE_JWT_SECRET');
      if(!jwtSecret){
        throw new UnauthorizedException('JWT secret not Found');
      }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      request['user'] = decoded;
      return true;
    } catch (err) {
     throw new UnauthorizedException('Invalid token');
    }
  }
}
