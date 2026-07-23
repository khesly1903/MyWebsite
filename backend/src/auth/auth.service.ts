import 'dotenv/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment');
    }

    if (email !== adminEmail || password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin', email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
