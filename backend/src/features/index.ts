import { Module } from '@nestjs/common';
import { KambanModule } from './kamban/kamban.module';

@Module({
  imports: [KambanModule],
  exports: [KambanModule],
})
export class FeatureModule {}
