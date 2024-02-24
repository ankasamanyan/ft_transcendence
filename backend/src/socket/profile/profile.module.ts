import { Module } from '@nestjs/common';
import { ProfileGateway } from './profile.gateway';
import { FriendService } from 'src/service/friend.service';
import { PrismaFriendRepository } from 'src/adapter/repository/prisma-friend-repository';
import { PrismaService } from 'src/service/prisma.service';
import { BlockedUsersService } from 'src/service/blocked-users.service';
import { PrismaBlockedUsersRepository } from 'src/adapter/repository/prisma-blocked-users-repository';

@Module({
  providers: [
    ProfileGateway,
    FriendService,
    PrismaFriendRepository,
    PrismaService,
    BlockedUsersService,
    PrismaBlockedUsersRepository,
    
  ]
})
export class ProfileModule {}
