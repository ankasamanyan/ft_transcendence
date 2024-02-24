import {Injectable} from '@nestjs/common';
import {User, Users} from "../domain/user";
import {PrismaChannelRepository} from "../adapter/repository/prisma-channel-repository";
import {Channel} from "../domain/channel";
import {from} from "rxjs";
import {PrismaChannelParticipantRepository} from "../adapter/repository/prisma-channel-participant-repository";
import {PrismaChannelAdminRepository} from "../adapter/repository/prisma-channel-admin-repository";
import {PrismaBannedUsersRepository } from 'src/adapter/repository/prisma-banned-users-repository';
import {PrismaMutedUsersRepository } from 'src/adapter/repository/prisma-muted-users-repository';
import { MuteTimer } from 'src/cron/timer';
import { ChannelUpdate } from 'src/domain/channel-update';

@Injectable()
export class ChannelService {
  constructor(
    private prismaChannelRepository: PrismaChannelRepository,
    private prismaChannelParticipantRepository: PrismaChannelParticipantRepository,
    private prismaChannelAdminRepository: PrismaChannelAdminRepository,
    private prismaMutedUsersRepository: PrismaMutedUsersRepository,
    private prismaBannedUsersRepository: PrismaBannedUsersRepository,
    private muteTimer: MuteTimer){
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

  addChannelAdmins(channelUpdate: ChannelUpdate) {
    return from(this.prismaChannelAdminRepository.addChannelAdmins(channelUpdate));
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

  removeChannel(channelId: number) {
    return from(this.prismaChannelRepository.removeChannel(channelId))
  }

  setPassword(channel: Channel) {
    const argon2 = require('argon2');
    const hashedPassword = argon2.hash(channel.password);
    channel.password = hashedPassword;
    console.log(channel.password);
    return from(this.prismaChannelRepository.setPassword(channel));
  }

  deletePassword(channelId: number) {
    return from(this.prismaChannelRepository.deletePassword(channelId));
  }

  assignAdmin(user: User, channelId: number) {
    return from(this.prismaChannelAdminRepository.assignAdmin(user, channelId));
  }

  removeAdmin(channelId: number, userId: number) {
    return from(this.prismaChannelAdminRepository.removeAdmin(channelId, userId));
  }

  removeChannelAdmins(channelUpdate: ChannelUpdate) {
    return from(this.prismaChannelAdminRepository.removeChannelAdmins(channelUpdate));
  }

  enterChannel(channelUpdate: ChannelUpdate) {
    return from(this.prismaChannelParticipantRepository.enterChannel(channelUpdate));
  }

    //at the moment this is exactly like kickUser
  leaveChannel(channelUpdate: ChannelUpdate) {
    return from(this.prismaChannelParticipantRepository.leaveChannel(channelUpdate));
  }

  //this could be a separate method from leaveChannel in case we want to add a time limit later
  kickUser(channelId: number, userId: number) {
    return from(this.prismaChannelParticipantRepository.kickUser(channelId, userId));
  }

  kickUsers(channelUpdate: ChannelUpdate) {
    return from(this.prismaChannelParticipantRepository.kickUsers(channelUpdate));
  }

  muteUser(user: User, channelId: number) {
    this.muteTimer.setTimer(channelId, user.id);
    return from(this.prismaMutedUsersRepository.muteUser(user, channelId));
  }

  muteUsers(channelUpdate: ChannelUpdate) {
    channelUpdate.users.forEach(user => this.muteTimer.setTimer(channelUpdate.channelId, user.id));
    return from(this.prismaMutedUsersRepository.muteUsers(channelUpdate));
  }

  unmuteUser(channelId: number, userId: number) {
    return from(this.prismaMutedUsersRepository.unmuteUser(channelId, userId));
  }

  isMuted(channelId: number, userId: number) {
    return from(this.prismaMutedUsersRepository.isMuted(channelId, userId));
  }

  banUser(user: User, channelId: number) {
    this.kickUser(channelId, user.id);
    return from(this.prismaBannedUsersRepository.banUser(user, channelId))
  }

  banUsers(channelUpdate: ChannelUpdate) {
    return from(this.prismaBannedUsersRepository.banUsers(channelUpdate));
  }

  unbanUser(channelId: number, userId: number) {
    return from(this.prismaBannedUsersRepository.unbanUser(channelId, userId))
  }

  isBanned(channelUpdate: ChannelUpdate) {
    return from(this.prismaBannedUsersRepository.isBanned(channelUpdate));
  }

  changeStatus(channel: Channel) {
    //public, private or password-protected
    return from(this.prismaChannelRepository.changeStatus(channel.id, channel.type, channel.password));
  }

  getStatus(channelId:number) {
    return from(this.prismaChannelRepository.getStatus(channelId));
  }

  getJoinedPublicandProtectedChannels(userId: number) {
    return from(this.prismaChannelRepository.getJoinedPublicandProtectedChannels(userId));
  }

}
