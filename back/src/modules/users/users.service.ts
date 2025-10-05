import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { RegisterUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, Role } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UsersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Postgres connected');
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const {
      dni_user,
      name,
      lastname,
      username,
      password,
      email,
      birthdate,
      address,
      number_phone,
      role,
    } = registerUserDto;

    const dni = await this.users.findUnique({
      where: {
        dni_user: dni_user,
      },
    });

    if (dni) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'dni_user already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const mail = await this.users.findUnique({
      where: {
        email: email,
      },
    });

    if (mail) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'mail already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const user_name = await this.users.findUnique({
      where: {
        username: username,
      },
    });

    if (user_name) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'username already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const newUser = await this.users.create({
      data: {
        dni_user,
        name,
        lastname,
        username,
        password,
        email,
        birthdate,
        address,
        number_phone,
        role: Role[role],
      },
    });

    const { password: __, ...rest } = newUser;

    return {
      user: rest,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
