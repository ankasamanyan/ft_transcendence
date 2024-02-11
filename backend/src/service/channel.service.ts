import {Injectable, Param} from '@nestjs/common';
import {User} from "../domain/user";
import {PrismaChannelRepository} from "../adapter/repository/prisma-channel-repository";
import {Channel} from "../domain/channel";
import {from} from "rxjs";
import {PrismaChannelParticipantRepository} from "../adapter/repository/prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "../adapter/repository/prisma-channel-admin-repository";

@Injectable()
export class ChannelService {
  constructor(
      private prismaChannelRepository: PrismaChannelRepository,
      private prismaChannelParticipantRepository: PrismaChannelParticipantRepository,
      private prismaChannelAdminRepository: PrismaChannelAdminRepository) {

  }

  addChannelInformation(channel: Channel) {
    return from(this.prismaChannelRepository.addChannel(channel));
  }

  getChannels(userId: number) {
    return from(this.prismaChannelRepository.getChannels(userId));
  }

  getChannelDetailsById(channelId: number) {
    return from(this.prismaChannelRepository.getChannelDetailsById(channelId));
  }

  addChannelParticipants(channel: Channel) {
    return from(this.prismaChannelParticipantRepository.addChannelParticipants(channel.id, channel.participants));
  }

  getChannelParticipants(channelId: number) {
    return from(this.prismaChannelParticipantRepository.getChannelParticipants(channelId));
  }

  addChannelAdmin(channel: Channel) {
    return from(this.prismaChannelAdminRepository.addChannelAdmin(channel.id, channel.admins[0]));
  }

  // renameChannel(@Param('channelId') channelId: number, @Param('renameTo') renameTo: string) {


    initializeChannels() {
    return from(this.prismaChannelRepository.initializeChannels());
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
}
