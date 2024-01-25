import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DialogController} from "./adapter/dialog.controller";
import {DialogService} from "./service/dialog.service";
import {MessageController} from "./adapter/message.controller";
import {MessageService} from "./service/message.service";
import {DialogsService} from "./service/dialogs.service";
import {DialogsController} from "./adapter/dialogs.controller";

@Module({
  imports: [],
  controllers: [AppController, DialogController, MessageController, DialogsController],
  providers: [AppService, DialogService, MessageService, DialogsService],
})
export class AppModule {}
