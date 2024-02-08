import {Injectable} from '@nestjs/common';
import {Users, User} from "../domain/user";
import {Channel} from "../domain/channel";
import {PrismaChannelRepository} from "../adapter/repository/prisma-channel-repository";
import {PrismaChannelParticipantRepository} from "../adapter/repository/prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "../adapter/repository/prisma-channel-admin-repository";

@Injectable()
export class ChannelService {
  constructor(
      private prismaChannelRepository: PrismaChannelRepository) {

  }
  createChannel(users: Users) {
   // the first user in the array is the owner and admin
   //the channel is private by default
  }

  setPassword(password: string) {}
  
  assignAdmin(user: User) {}

  leaveChannel() {}

  kickUser(user: User) {}

  muteUser(user: User) {
    //user cannot write messages
  }

  banUser(user: User) {
    //kicked and cannot rejoin
  }

  changeStatus(status: number, password: string = "") {
    //public, private or password-protected
  }

  addChannelInformation(channel: Channel) {
    this.prismaChannelRepository.addChannel(channel);

  }
}
