import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureModule } from './features';

@Module({
  imports: [ConfigModule.forRoot(), FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
