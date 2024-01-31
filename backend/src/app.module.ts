import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DialogController} from "./adapter/dialog.controller";
import {DialogService} from "./service/dialog.service";
import {MessageController} from "./adapter/message.controller";
import {MessageService} from "./service/message.service";
import {DialogsService} from "./service/dialogs.service";
import {DialogsController} from "./adapter/dialogs.controller";
import {UsersController} from "./adapter/users.controller";
import {UsersService} from "./service/users.service";
import {BlockedUsersController} from "./adapter/blocked-users.controller";
import {BlockedUsersService} from "./service/blocked-users.service";

@Module({
  imports: [],
  controllers: [AppController, DialogController, MessageController, DialogsController, UsersController, BlockedUsersController],
  providers: [AppService, DialogService, MessageService, DialogsService, UsersService, BlockedUsersService],
})
export class AppModule {}
