import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaClient } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { JwtService } from '../common/jwt/jwt.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CustomersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('CustomersService');
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  onModuleInit() {
    this.$connect();
    this.logger.log('Postgres connected');
  }
  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const {
      dni_customer,
      name,
      lastname,
      username,
      password,
      email,
      birthdate,
      address,
      number_phone,
    } = createCustomerDto;

    const dni = await this.customers.findUnique({
      where: {
        dni_customer: dni_customer,
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

    const mail = await this.customers.findUnique({
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

    const user_name = await this.customers.findUnique({
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

    const newCustomer: CustomerEntity = await this.customers.create({
      data: {
        dni_customer,
        name,
        lastname,
        username,
        password: bcrypt.hashSync(password, 10),
        email,
        birthdate,
        address,
        number_phone,
      },
    });

    const {
      lastname: _lastname,
      username: _username,
      birthdate: _birthdate,
      address: _address,
      number_phone: _phone,
      password: _password,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...rest
    } = newCustomer;
    return {
      user: rest,
      token: await this.jwtService.signJWT(rest),
    };
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
