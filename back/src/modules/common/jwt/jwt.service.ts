import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtPayload } from 'src/modules/users/interfaces/jwt-payload.interface';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
      secret: envs.jwtSecret,
    });

    return {
      user: user,
      token: await this.signJWT(user),
    };
  }
}
