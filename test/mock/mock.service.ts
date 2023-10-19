import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/apis/auth/services/auth.service';
import { SchoolPagesService } from 'src/apis/school-pages/services/school-pages.service';
import { StudentsService } from 'src/apis/students/students.service';
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

export class MockAuthService implements MockClass<AuthService> {
  signIn = jest.fn();
  signUp = jest.fn();
  generateAccessToken = jest.fn();
}

export class MockStudentsService implements MockClass<StudentsService> {
  create = jest.fn();
  findOneBy = jest.fn();
}

export class MockSchoolPagesService implements MockClass<SchoolPagesService> {
  findAllAndCountNews = jest.fn();
  findAllAndCount = jest.fn();
  subscribe = jest.fn();
  unsubscribe = jest.fn();
  findOneNewsOrNotFound = jest.fn();
  findOneOrNotFound = jest.fn();
  findOneSchoolPageAdminOrForbidden = jest.fn();
  create = jest.fn();
  createNews = jest.fn();
  partialUpdateNews = jest.fn();
  removeNews = jest.fn();
}
