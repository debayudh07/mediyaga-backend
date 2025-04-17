import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctor.controller';

describe('DoctorController', () => {
  let controller: DoctorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
    }).compile();

    controller = module.get<DoctorsController>(DoctorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
