import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DoctorsService } from 'src/doctor/doctor.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private doctorsService: DoctorsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.password || !password) {
      return null;
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...result } = user.toObject();
        return { ...result, role: 'user' };
      }
    } catch (error) {
      console.error('User password validation error:', error);
    }
    return null;
  }

  async validateDoctor(email: string, password: string): Promise<any> {
    const doctor = await this.doctorsService.findByEmail(email);
    if (!doctor || !doctor.password || !password) {
      return null;
    }

    try {
      const isMatch = await bcrypt.compare(password, doctor.password);
      if (isMatch) {
        const { password, ...result } = doctor.toObject();
        return { ...result, role: 'doctor' };
      }
    } catch (error) {
      console.error('Doctor password validation error:', error);
    }
    return null;
  }

  async loginUser(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { email: user.email, sub: user._id, role: 'user' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: 'user',
      },
    };
  }

  async loginDoctor(email: string, password: string) {
    const doctor = await this.validateDoctor(email, password);
    if (!doctor) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { email: doctor.email, sub: doctor._id, role: 'doctor' };
    return {
      access_token: this.jwtService.sign(payload),
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        phoneNumber: doctor.phoneNumber,
        specialization: doctor.specialization,
        role: 'doctor',
      },
    };
  }

  async registerUser(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Create user (password hashing is now handled in the UsersService)
    const user = await this.usersService.create(createUserDto);
    
    const { password, ...result } = user.toObject();
    return result;
  }

  async registerDoctor(createDoctorDto: CreateDoctorDto) {
    // Check if doctor already exists
    const existingDoctor = await this.doctorsService.findByEmail(createDoctorDto.email);
    if (existingDoctor) {
      throw new UnauthorizedException('Email already in use');
    }

    // Create doctor (password hashing is now handled in the DoctorsService)
    const doctor = await this.doctorsService.create(createDoctorDto);
    
    const { password, ...result } = doctor.toObject();
    return result;
  }
}