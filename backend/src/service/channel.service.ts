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
    return from(this.prismaChannelRepository.setPassword(channel));
  }

  deletePassword(channelId: number) {
    return from(this.prismaChannelRepository.deletePassword(channelId));
  }

  assignAdmin(user: User, channelId: number) {
    return from(this.prismaChannelAdminRepository.assignAdmin(user, channelId));
  }

  assignAdmins(users: Users, channelId: number) {
    const admins = users.users.map(user => this.assignAdmin(user, channelId));
    return admins;
  }

  removeAdmin(channelId: number, userId: number) {
    return from(this.prismaChannelAdminRepository.removeAdmin(channelId, userId));
  }

  removeAdmins(userIds: number[], channelId: number) {
    const admins = userIds.forEach(user => this.removeAdmin(channelId, user));
    return admins;
  }

  enterChannel(user: User, channelId: number) {
    return from(this.prismaChannelParticipantRepository.enterChannel(user, channelId));
  }

    //at the moment this is exactly like kickUser
  leaveChannel(channelId: number, userId: number) {
    return from(this.prismaChannelParticipantRepository.leaveChannel(channelId, userId));
  }

  //this could be a separate method from leaveChannel in case we want to add a time limit later
  kickUser(channelId: number, userId: number) {
    return from(this.prismaChannelParticipantRepository.kickUser(channelId, userId));
  }

  kickUsers(users: Users, channelId: number) {
    const kickedUsers = users.users.map(user => this.kickUser(channelId, user.id));
    return kickedUsers;
  }

  muteUser(user: User, channelId: number) {
    this.muteTimer.setTimer(channelId, user.id);
    return from(this.prismaMutedUsersRepository.muteUser(user, channelId));
  }

  muteUsers(users: Users, channelId: number) {
    users.users.forEach(user => this.muteTimer.setTimer(channelId, user.id));
    const mutedUsers = users.users.map(user => this.muteUser(user, channelId));
    return mutedUsers;
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

  banUsers(users: Users, channelId: number) {
    users.users.forEach(user => this.kickUser(channelId, user.id));
    const bannedUsers = users.users.map(user => this.banUser(user, channelId));
    return bannedUsers;
  }

  unbanUser(channelId: number, userId: number) {
    return from(this.prismaBannedUsersRepository.unbanUser(channelId, userId))
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
