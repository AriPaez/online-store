import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '5m' }, //Expires in 5 minutes
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
