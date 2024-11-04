import { Injectable } from '@nestjs/common';
import { ConfigService as BaseConfigService } from '@nestjs/config';
@Injectable()
export class ConfigService extends BaseConfigService {}
