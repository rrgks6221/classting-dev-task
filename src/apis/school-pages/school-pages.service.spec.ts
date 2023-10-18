import { Test, TestingModule } from '@nestjs/testing';
import { SchoolPagesService } from './school-pages.service';

describe('SchoolPagesService', () => {
  let service: SchoolPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolPagesService],
    }).compile();

    service = module.get<SchoolPagesService>(SchoolPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
