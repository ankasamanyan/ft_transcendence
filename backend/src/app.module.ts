import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DialogController} from "./adapter/dialog.controller";
import {DialogService} from "./service/dialog.service";
import {MessageController} from "./adapter/message.controller";
import {MessageService} from "./service/message.service";

@Module({
  imports: [],
  controllers: [AppController, DialogController, MessageController],
  providers: [AppService, DialogService, MessageService],
})
export class AppModule {}
