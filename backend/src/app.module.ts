import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MessageController} from "./adapter/message.controller";
import {MessageService} from "./service/message.service";
import {UsersController} from "./adapter/users.controller";
import {UsersService} from "./service/users.service";
import {BlockedUsersController} from "./adapter/blocked-users.controller";
import {BlockedUsersService} from "./service/blocked-users.service";
import {ChannelController} from "./adapter/channel.controller";
import {ChannelService} from "./service/channel.service";
import {PrismaService} from "./service/prisma.service";
import {PrismaUsersRepository} from "./adapter/repository/prisma-users-repository";
import {PrismaChannelRepository} from "./adapter/repository/prisma-channel-repository";
import {PrismaBlockedUsersRepository} from "./adapter/repository/prisma-blocked-users-repository";
import {PrismaMessagesRepository} from "./adapter/repository/prisma-messages-repository";
import {FriendController} from "./adapter/friend.controller";
import {PrismaFriendRepository} from "./adapter/repository/prisma-friend-repository";
import {FriendService} from "./service/friend.service";
import {PrismaChannelAdminRepository} from "./adapter/repository/prisma-channel-admin-repository";
import {PrismaChannelParticipantRepository} from "./adapter/repository/prisma-channel-participant-repository";
import {PrismaMutedUsersRepository} from "./adapter/repository/prisma-muted-users-repository";
import {PrismaBannedUsersRepository} from "./adapter/repository/prisma-banned-users-repository";
import {ChatGatewayModule } from './socket/chat-gateway/chat-gateway.module';
import { MuteTimer } from './cron/timer';
import { PrismaUserStatisticsRespository } from './adapter/repository/prisma-user-statistics-respository';
import { UserStatisticsController } from './adapter/user-statistics.controller';
import { UserStatisticsService } from './service/user-statistics.service';
import { GameController } from './adapter/game-controller';
import { GameService } from './service/game-service';
import { PrismaGameInvitationRepository } from './adapter/repository/prisma-game-invitation-repository';

@Module({
    imports: [ChatGatewayModule],
    controllers: [
        AppController,
        MessageController,
        UsersController,
        BlockedUsersController,
        ChannelController,
        FriendController,
        UserStatisticsController,
        GameController],
    providers: [
        MuteTimer,
        AppService,
        MessageService,
        UsersService,
        BlockedUsersService,
        ChannelService,
        FriendService,
        PrismaService,
        GameService,
        PrismaUsersRepository,
        PrismaChannelRepository,
        PrismaBlockedUsersRepository,
        PrismaMessagesRepository,
        PrismaFriendRepository,
        PrismaChannelAdminRepository,
        PrismaChannelParticipantRepository,
        PrismaMutedUsersRepository,
        PrismaBannedUsersRepository,
        PrismaUserStatisticsRespository,
        PrismaGameInvitationRepository,
        UserStatisticsService ],
})
export class AppModule {
}
