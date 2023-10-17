import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from 'src/config/external-config/typeorm-config.service';

@Module({
  providers: [TypeOrmConfigService],
})
export class ExternalConfigModule {}
