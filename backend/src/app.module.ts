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
import { GameModule } from './socket/game/game.module';
import { ConfigModule } from '@nestjs/config';
import {AuthController} from "./auth/auth.controller";
import {FTStrategy} from "./auth/strategy/42.strategy";
import {AuthService} from "./auth/auth.service";
import { PrismaGameRepository } from './adapter/repository/prisma-game-repository';
import { FTAuthGuard } from './auth/guards/auth.42.guard';
import { JwtService } from '@nestjs/jwt';
import { ProfileModule } from './socket/profile/profile.module';
import { StatusController } from './adapter/status-controller';
import { PrismaQueueRepository } from './adapter/repository/prisma-queue-repository';
import { PrismaStatusRepository } from './adapter/repository/prisma-status-repository';
import { QueueService } from './service/queue-service';
import { StatusService } from './service/status-service';
import { PrismaOnlineStatusRepository } from './adapter/repository/prisma-online-status-repository';
import {JwtStrategy} from "./auth/strategy/jwt.strategy";
import { UploadController } from './adapter/upload-controller';
import { UploadService } from './service/upload.service';
import {PrismaUploadRepository} from "./adapter/repository/prisma-upload-repository";

@Module({
  imports: [
    ChatGatewayModule,
    GameModule,
    ProfileModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    AppController,
    MessageController,
    UsersController,
    BlockedUsersController,
    ChannelController,
    FriendController,
    UserStatisticsController,
    GameController,
    AuthController,
    StatusController,
    UploadController,
  ],
  providers: [
    MuteTimer,
    AppService,
    MessageService,
    UsersService,
    UploadService,
    BlockedUsersService,
    ChannelService,
    FriendService,
    PrismaService,
    GameService,
    QueueService,
    StatusService,
    PrismaUsersRepository,
    PrismaChannelRepository,
    PrismaBlockedUsersRepository,
    PrismaMessagesRepository,
    PrismaGameRepository,
    PrismaFriendRepository,
    PrismaChannelAdminRepository,
    PrismaChannelParticipantRepository,
    PrismaMutedUsersRepository,
    PrismaBannedUsersRepository,
    PrismaUserStatisticsRespository,
    PrismaGameInvitationRepository,
    PrismaQueueRepository,
    PrismaStatusRepository,
    PrismaOnlineStatusRepository,
    PrismaUploadRepository,
    UserStatisticsService,
    AuthService,
    FTAuthGuard,
    FTStrategy,
    JwtService,
    JwtStrategy,
  ],
})
export class AppModule {}
