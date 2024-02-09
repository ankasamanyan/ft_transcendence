import {Injectable} from '@nestjs/common';
import {User} from "../domain/user";
import {PrismaChannelRepository} from "../adapter/repository/prisma-channel-repository";
import {Channel} from "../domain/channel";
import {from} from "rxjs";
import {PrismaChannelParticipantRepository} from "../adapter/repository/prisma-channel-participant-repository";

@Injectable()
export class ChannelService {
  constructor(
      private prismaChannelRepository: PrismaChannelRepository,
      private prismaChannelParticipantRepository: PrismaChannelParticipantRepository) {

  }

  addChannelInformation(channel: Channel) {
    this.prismaChannelRepository.addChannel(channel);
  }

  getChannels(userId: number) {
    return from(this.prismaChannelRepository.getChannels(userId));
  }

  getChannelDetailsById(channelId: number) {
    return from(this.prismaChannelRepository.getChannelDetailsById(channelId));
  }

  getChannelParticipants(channelId: number) {
    return from(this.prismaChannelParticipantRepository.getChannelParticipants(channelId));
  }

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
