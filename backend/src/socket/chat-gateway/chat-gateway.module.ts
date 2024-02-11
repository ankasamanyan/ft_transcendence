import {Module} from '@nestjs/common';
import {ChatGatewayGateway} from './chat-gateway.gateway';
import {MessageService} from "../../service/message.service";
import {PrismaMessagesRepository} from "../../adapter/repository/prisma-messages-repository";
import {PrismaService} from "../../service/prisma.service";
import {ChannelService} from "../../service/channel.service";
import {PrismaChannelRepository} from "../../adapter/repository/prisma-channel-repository";
import {PrismaChannelParticipantRepository} from "../../adapter/repository/prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "../../adapter/repository/prisma-channel-admin-repository";

@Module({
  providers: [
    ChatGatewayGateway,
    MessageService,
    PrismaMessagesRepository,
    PrismaService,
    ChannelService,
    PrismaChannelRepository,
    PrismaChannelParticipantRepository,
    PrismaChannelAdminRepository ]
})
export class ChatGatewayModule {
}
