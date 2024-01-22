import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DialogController} from "./adapter/dialog.controller";
import {DialogService} from "./service/dialog.service";

@Module({
  imports: [],
  controllers: [AppController, DialogController],
  providers: [AppService, DialogService],
})
export class AppModule {}
