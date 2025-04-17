// src/doctors/doctors.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Put,
  } from '@nestjs/common';
 import { DoctorsService } from './doctor.service';
  import { CreateDoctorDto } from './dto/create-doctor.dto';
  import { UpdateDoctorDto } from './dto/update-doctor.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { Public } from 'src/auth/public/public.decorator';
  
  @Controller('doctors')
  export class DoctorsController {
    constructor(private readonly doctorsService: DoctorsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createDoctorDto: CreateDoctorDto) {
      return this.doctorsService.create(createDoctorDto);
    }
  
    @Public()
    @Get()
    findAll() {
      return this.doctorsService.findAll();
    }
  
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.doctorsService.findOne(id);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
      return this.doctorsService.update(id, updateDoctorDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
      return this.doctorsService.remove(id);
    }
  }