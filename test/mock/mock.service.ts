import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/app-config/app-config.service';
import { MockClass } from 'test/mock/mock.type';

export class MockConfigService implements MockClass<ConfigService> {
  getOrThrow = jest.fn();
  get = jest.fn();
}

export class MockAppConfigService implements MockClass<AppConfigService> {
  get = jest.fn();
  getList = jest.fn();
  getAll = jest.fn();
  getAllMap = jest.fn();
  isLocal = jest.fn();
  isProduction = jest.fn();
}
