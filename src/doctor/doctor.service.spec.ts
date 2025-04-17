import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctor.service';

describe('DoctorService', () => {
  let service: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorsService],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
