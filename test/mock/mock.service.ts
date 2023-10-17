import { ConfigService } from '@nestjs/config';
import { MockClass } from 'test/mock/mock.type';

export class MockConfigService implements MockClass<ConfigService> {
  getOrThrow = jest.fn();
  get = jest.fn();
}
