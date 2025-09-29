import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordUserDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Put('update')
  UpdateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.registerUser(updateUserDto);
  }

  @Post('change-password')
  changePassword(@Body() changePasswordUserDto: ChangePasswordUserDto) {
    return this.authService.changePassword(changePasswordUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Get('verify')
  verifyToken() {}

  findAllUsers(@Req() req: Request) {}

  @Get(':id')
  findOneUser(@Param('id') id: string) {}

  @Delete(':id')
  removeUser(@Param('id') id: string) {}
}
