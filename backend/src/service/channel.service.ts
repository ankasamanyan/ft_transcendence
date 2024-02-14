import {Injectable} from '@nestjs/common';
import {User} from "../domain/user";
import {PrismaChannelRepository} from "../adapter/repository/prisma-channel-repository";
import {Channel} from "../domain/channel";
import {from} from "rxjs";
import {PrismaChannelParticipantRepository} from "../adapter/repository/prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "../adapter/repository/prisma-channel-admin-repository";
import {PrismaBannedUsersRepository } from 'src/adapter/repository/prisma-banned-users-repository';
import {PrismaMutedUsersRepository } from 'src/adapter/repository/prisma-muted-users-repository';

@Injectable()
export class ChannelService {
  constructor(
    private prismaChannelRepository: PrismaChannelRepository,
    private prismaChannelParticipantRepository: PrismaChannelParticipantRepository,
    private prismaChannelAdminRepository: PrismaChannelAdminRepository,
    private prismaMutedUsersRepository: PrismaMutedUsersRepository,
    private prismaBannedUsersRepository: PrismaBannedUsersRepository){
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

  getChannelAdmins(channelId: number) {
    return from(this.prismaChannelAdminRepository.getChannelAdmins(channelId));
  }

  renameChannel(channel: Channel) {
    return this.prismaChannelRepository.renameChannel(channel);
  }

  changeChannelType(channel: Channel) {
    return this.prismaChannelRepository.changeChannelType(channel);
  }

  initializeChannels() {
    return from(this.prismaChannelRepository.initializeChannels());
  }

  setPassword(channel: Channel) {
    return from(this.prismaChannelRepository.setPassword(channel));
  }

  deletePassword(channelId: number) {
    return from(this.prismaChannelRepository.deletePassword(channelId));
  }

  assignAdmin(user: User, channelId: number) {
    return from(this.prismaChannelAdminRepository.assignAdmin(user, channelId));
  }

    //at the moment this is exactly like kickUser
  leaveChannel(channelId: number, userId: number) {
    return from(this.prismaChannelParticipantRepository.leaveChannel(channelId, userId));
  }

  //this could be a separate method from leaveChannel in case we want to add a time limit later
  kickUser(channelId: number, userId: number) {
    return from(this.prismaChannelParticipantRepository.kickUser(channelId, userId));
  }

  muteUser(user: User, channelId: number) {
    return from(this.prismaMutedUsersRepository.muteUser(user, channelId));
  }

  unmuteUser(channelId: number, userId: number) {
    return from(this.prismaMutedUsersRepository.unmuteUser(channelId, userId));
  }

  isMuted(channelId: number, userId: number) {
    return from(this.prismaMutedUsersRepository.isMuted(channelId, userId));
  }

  banUser(user: User, channelId: number) {
    return from(this.prismaBannedUsersRepository.banUser(user, channelId))
  }

  unbanUser(channelId: number, userId: number) {
    return from(this.prismaBannedUsersRepository.unbanUser(channelId, userId))
  }

  changeStatus(status: number, password: string = "") {
    //public, private or password-protected
  }
}
