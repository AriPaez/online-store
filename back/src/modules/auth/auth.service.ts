import { Injectable } from '@nestjs/common';
import { ChangePasswordUserDto } from './dto/change-password.dto';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  async verifyToken(token: string) {}

  async registerUser(registerUserDto: RegisterUserDto) {}

  async updateUser(updateDTO: UpdateUserDto) {}
  async loginUser(loginUserDto: LoginUserDto) {}

  // async findAllUsers(tableDTO: TableDTO) {}

  async findOneUser(id: string) {}

  async removeUser(id: string) {}
  async changePassword(changePasswordUserDto: ChangePasswordUserDto) {}
}
