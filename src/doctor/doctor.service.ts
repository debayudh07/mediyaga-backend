// src/doctors/doctors.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<DoctorDocument> {
    // Check if email already exists
    const existingDoctor = await this.doctorModel.findOne({ email: createDoctorDto.email }).exec();
    if (existingDoctor) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);

    // Create new doctor
    const newDoctor = new this.doctorModel({
      ...createDoctorDto,
      password: hashedPassword,
    });

    return newDoctor.save();
  }

  async findAll(): Promise<DoctorDocument[]> {
    return this.doctorModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<DoctorDocument> {
    const doctor = await this.doctorModel.findById(id).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async findByEmail(email: string): Promise<DoctorDocument | null> {
    return this.doctorModel.findOne({ email }).exec();
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<DoctorDocument> {
    // If password is being updated, hash it
    let updateData = { ...updateDoctorDto };
    if (updateDoctorDto.password) {
      updateData.password = await bcrypt.hash(updateDoctorDto.password, 10);
    }
    
    const updatedDoctor = await this.doctorModel
      .findByIdAndUpdate(id, updateDoctorDto, { new: true })
      .exec();
    if (!updatedDoctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return updatedDoctor;
  }

  async remove(id: string): Promise<DoctorDocument> {
    const deletedDoctor = await this.doctorModel.findByIdAndDelete(id).exec();
    if (!deletedDoctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return deletedDoctor;
  }
}