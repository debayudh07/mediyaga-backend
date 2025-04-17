// src/doctors/schemas/doctor.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  hospitalAffiliation: string;

  @Prop()
  experience: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);