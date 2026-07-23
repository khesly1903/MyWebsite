import 'dotenv/config';
import {
  Injectable, CanActivate, ExecutionContext, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      request.user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
