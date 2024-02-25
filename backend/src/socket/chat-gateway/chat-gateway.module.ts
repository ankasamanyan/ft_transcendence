import {Module} from '@nestjs/common';
import {ChatGatewayGateway} from './chat-gateway.gateway';
import {MessageService} from "../../service/message.service";
import {PrismaMessagesRepository} from "../../adapter/repository/prisma-messages-repository";
import {PrismaService} from "../../service/prisma.service";
import {ChannelService} from "../../service/channel.service";
import {PrismaChannelRepository} from "../../adapter/repository/prisma-channel-repository";
import {PrismaChannelParticipantRepository} from "../../adapter/repository/prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "../../adapter/repository/prisma-channel-admin-repository";
import { PrismaBannedUsersRepository } from 'src/adapter/repository/prisma-banned-users-repository';
import { PrismaMutedUsersRepository } from 'src/adapter/repository/prisma-muted-users-repository';
import { MuteTimer } from 'src/cron/timer';
import { PrismaUserStatisticsRespository } from 'src/adapter/repository/prisma-user-statistics-respository';
import {BlockedUsersService} from "../../service/blocked-users.service";
import {PrismaBlockedUsersRepository} from "../../adapter/repository/prisma-blocked-users-repository";
import { OnlineStatusService } from 'src/service/online-status.service';
import { PrismaOnlineStatusRepository } from 'src/adapter/repository/prisma-online-status-repository';

@Module({
  providers: [
    ChatGatewayGateway,
    MessageService,
    PrismaMessagesRepository,
    PrismaService,
    ChannelService,
    PrismaChannelRepository,
    PrismaChannelParticipantRepository,
    PrismaChannelAdminRepository,
    PrismaBannedUsersRepository,
    PrismaMutedUsersRepository,
    PrismaUserStatisticsRespository,
    MuteTimer,
    BlockedUsersService,
    PrismaBlockedUsersRepository,
    PrismaOnlineStatusRepository,
    OnlineStatusService
  ]
})
export class ChatGatewayModule {
}
