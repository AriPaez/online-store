import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { LoginDto, RegisterUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '../common/jwt/jwt.service';
@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UsersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Postgres connected');
  }
  constructor(private readonly jwtService: JwtService) {
    super();
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

    const newUser: UserEntity = await this.users.create({
      data: {
        dni_user,
        name,
        lastname,
        username,
        password: bcrypt.hashSync(password, 10),
        email,
        birthdate,
        address,
        number_phone,
        role: (role || 'USER') as any,
      },
    });

    //   / id: string;
    // email: string;
    // name: string;
    const {
      lastname: _lastname,
      username: _username,
      birthdate: _birthdate,
      address: _address,
      number_phone: _phone,
      role: _role,
      password: _password,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...rest
    } = newUser;
    return {
      user: rest,
      token: await this.jwtService.signJWT(rest),
    };
  }

  async loginUser(loginUserDto: LoginDto) {
    const { username, password } = loginUserDto;

    const user: UserEntity = await this.users.findUnique({
      where: { username },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User/Password not valid',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User/Password not valid',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const {
      lastname: _lastname,
      username: _username,
      birthdate: _birthdate,
      address: _address,
      number_phone: _phone,
      role: _role,
      password: _password,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...rest
    } = user;
    return {
      user: rest,
      token: await this.jwtService.signJWT(rest),
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
