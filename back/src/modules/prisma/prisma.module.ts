import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//HICE ESTO PARA PODER INYECTAR  PRISMA
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], 
})
export class PrismaModule {}
