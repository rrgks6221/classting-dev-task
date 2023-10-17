import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { MockConfigService } from 'test/mock/mock.service';

describe(AppConfigService.name, () => {
  let service: AppConfigService;
  let mockConfigService: MockConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
    mockConfigService = module.get<MockConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe(AppConfigService.prototype.get.name, () => {
    it('값 반환', () => {
      mockConfigService.get.mockReturnValue('value');

      expect(service.get('key' as any)).toBeDefined();
    });

    it('undefined 반환 return type 에 undefined 가 없지만 나올 수 있는 경우가 있음', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.get('key' as any)).toBeUndefined();
    });
  });

  describe(AppConfigService.prototype.getList.name, () => {
    it('1개의 key 로 요청했을 때', () => {
      mockConfigService.get.mockReturnValueOnce('value1');

      expect(service.getList('key1' as any)).toStrictEqual(['value1']);
    });

    it('2개의 key 로 요청했을 때', () => {
      mockConfigService.get.mockReturnValueOnce('value1');
      mockConfigService.get.mockReturnValueOnce('value2');

      expect(service.getList('key1' as any, 'key2' as any)).toStrictEqual([
        'value1',
        'value2',
      ]);
    });

    it('3개의 key 로 요청했을 때', () => {
      mockConfigService.get.mockReturnValueOnce('value1');
      mockConfigService.get.mockReturnValueOnce('value2');
      mockConfigService.get.mockReturnValueOnce('value3');

      expect(
        service.getList('key1' as any, 'key2' as any, 'key3' as any),
      ).toStrictEqual(['value1', 'value2', 'value3']);
    });
  });

  describe(AppConfigService.prototype.getAll.name, () => {
    it('모든 env 키가 존재할 때', () => {
      mockConfigService.get.mockReturnValue('value');

      expect(service.getAll()).not.toContain(undefined);
    });

    it('존재하지 않는 env 가 있을 때', () => {
      mockConfigService.get.mockReturnValueOnce(undefined);
      mockConfigService.get.mockReturnValue('value');

      expect(service.getAll()).toContain(undefined);
    });
  });

  describe(AppConfigService.prototype.getAllMap.name, () => {
    it('모든 env 키가 존재할 때', () => {
      mockConfigService.get.mockReturnValue('value');

      expect(Object.values(service.getAllMap()).every((el) => el)).toBe(true);
    });

    it('존재하지 않는 env 가 있을 때', () => {
      mockConfigService.get.mockReturnValueOnce(undefined);
      mockConfigService.get.mockReturnValue('value');

      expect(Object.values(service.getAllMap()).every((el) => el)).toBe(false);
    });
  });

  describe(AppConfigService.prototype.isLocal.name, () => {
    it('NODE_ENV 가 없을 때', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.isLocal()).toBe(false);
    });

    it('local 환경이 아닐 때', () => {
      mockConfigService.get.mockReturnValue('production');

      expect(service.isLocal()).toBe(false);
    });

    it('local 환경일 때', () => {
      mockConfigService.get.mockReturnValue('local');

      expect(service.isLocal()).toBe(true);
    });
  });

  describe(AppConfigService.prototype.isProduction.name, () => {
    it('NODE_ENV 가 없을 때', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.isProduction()).toBe(false);
    });

    it('production 환경이 아닐 때', () => {
      mockConfigService.get.mockReturnValue('local');

      expect(service.isProduction()).toBe(false);
    });

    it('production 환경일 때', () => {
      mockConfigService.get.mockReturnValue('prod');

      expect(service.isProduction()).toBe(true);
    });
  });
});
