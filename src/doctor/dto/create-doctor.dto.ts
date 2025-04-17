// src/doctors/dto/create-doctor.dto.ts
export class CreateDoctorDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly phoneNumber: string;
    readonly specialization: string;
    readonly licenseNumber: string;
    readonly isActive?: boolean;
    readonly hospitalAffiliation?: string;
    readonly experience?: number;
  }
  
  // src/doctors/dto/update-doctor.dto.ts
 