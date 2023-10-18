import { Module } from '@nestjs/common';
import { SchoolPagesService } from './school-pages.service';
import { SchoolPagesController } from './school-pages.controller';

@Module({
  controllers: [SchoolPagesController],
  providers: [SchoolPagesService]
})
export class SchoolPagesModule {}
