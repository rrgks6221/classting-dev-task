import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPagesController } from './school-pages.controller';
import { SchoolPagesService } from './school-pages.service';

describe('SchoolPagesController', () => {
  let controller: SchoolPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolPagesController],
      providers: [SchoolPagesService],
    }).compile();

    controller = module.get<SchoolPagesController>(SchoolPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
