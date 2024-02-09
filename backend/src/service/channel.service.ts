import {Injectable} from '@nestjs/common';
import {User} from "../domain/user";
import {PrismaChannelRepository} from "../adapter/repository/prisma-channel-repository";
import {Channel} from "../domain/channel";
import {from} from "rxjs";

@Injectable()
export class ChannelService {
  constructor(
      private prismaChannelRepository: PrismaChannelRepository) {

  }

  addChannelInformation(channel: Channel) {
    this.prismaChannelRepository.addChannel(channel);
  }

  getChannels(userId: number) {
    return from(this.prismaChannelRepository.getChannels(userId));
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
