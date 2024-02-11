import { Module } from '@nestjs/common';
import { ChatGatewayGateway } from './chat-gateway.gateway';
import {MessageService} from "../service/message.service";
import {PrismaMessagesRepository} from "../adapter/repository/prisma-messages-repository";
import {PrismaService} from "../service/prisma.service";

@Module({
  providers: [ChatGatewayGateway, MessageService, PrismaMessagesRepository, PrismaService]
})
export class ChatGatewayModule {}
