import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
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
import {ChannelController} from "./adapter/channel.controller";
import {ChannelService} from "./service/channel.service";
import {PrismaService} from "./service/prisma.service";
import {PrismaUsersRepository} from "./adapter/repository/prisma-users-repository";

@Module({
    imports: [],
    controllers: [
        AppController,
        DialogController,
        MessageController,
        DialogsController,
        UsersController,
        BlockedUsersController,
        ChannelController],
    providers: [
        AppService,
        DialogService,
        MessageService,
        DialogsService,
        UsersService,
        BlockedUsersService,
        ChannelService,
        PrismaService,
        PrismaUsersRepository],
})
export class AppModule {
}
