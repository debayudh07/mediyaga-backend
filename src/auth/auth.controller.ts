import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { Public } from './public/public.decorator';

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login/user')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto.email, loginDto.password);
  }

  @Public()
  @Post('login/doctor')
  @HttpCode(HttpStatus.OK)
  async loginDoctor(@Body() loginDto: LoginDto) {
    return this.authService.loginDoctor(loginDto.email, loginDto.password);
  }

  @Public()
  @Post('register/user')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @Post('register/doctor')
  async registerDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.registerDoctor(createDoctorDto);
  }
}