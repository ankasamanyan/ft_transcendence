import { Module } from '@nestjs/common';
import { ProfileGateway } from './profile.gateway';
import { FriendService } from 'src/service/friend.service';
import { PrismaFriendRepository } from 'src/adapter/repository/prisma-friend-repository';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  providers: [
    ProfileGateway,
    FriendService,
    PrismaFriendRepository,
    PrismaService,
  ]
})
export class ProfileModule {}
