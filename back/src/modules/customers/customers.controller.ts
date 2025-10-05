import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginDto } from '../users/dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';
import { CurrentUser } from '../common/interfaces/current-user.interface';
import { Token } from '../common/decorators';
import { JwtService } from '../common/jwt/jwt.service';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.registerCustomer(createCustomerDto);
  }

  @Post('login')
  loginUser(@Body() loginCustomerDto: LoginDto) {
    return this.customersService.loginCustomer(loginCustomerDto);
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return this.jwtService.verifyToken(token);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
