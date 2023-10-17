import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { TypeOrmConfigService } from 'src/config/external-config/typeorm-config.service';
import { MockAppConfigService } from 'test/mock/mock.service';

describe(TypeOrmConfigService.name, () => {
  let service: TypeOrmConfigService;
  let appConfigService: MockAppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmConfigService,
        {
          provide: AppConfigService,
          useClass: MockAppConfigService,
        },
      ],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
    appConfigService = module.get<MockAppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(TypeOrmConfigService.prototype.createTypeOrmOptions.name, () => {
    beforeEach(() => {
      appConfigService.get.mockReturnValue('value');
      appConfigService.isLocal.mockReturnValue(true);
    });

    it('return TypeOrmModuleOptions', () => {
      expect(service.createTypeOrmOptions()).toStrictEqual({
        type: 'mysql',
        host: 'value',
        port: 'value',
        username: 'value',
        password: 'value',
        database: 'value',
        entities: expect.arrayContaining([
          expect.stringContaining('dist/**/*.entity{.ts,.js}'),
        ]),
        synchronize: false,
        logging: true,
      });
    });
  });
});
