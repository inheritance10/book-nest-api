import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
