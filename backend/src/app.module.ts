import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DialogGateway} from "./adapter/dialog.controller";
import {DialogService} from "./service/dialog.service";
import {MessageController} from "./adapter/message.controller";
import {MessageService} from "./service/message.service";
import {DialogsService} from "./service/dialogs.service";
import {DialogsController} from "./adapter/dialogs.controller";
import {UsersController} from "./adapter/users.controller";
import {UsersService} from "./service/users.service";

@Module({
  imports: [],
  controllers: [AppController, MessageController, DialogsController, UsersController],
  providers: [AppService, DialogService, MessageService, DialogsService, UsersService, DialogGateway],
})
export class AppModule {}
