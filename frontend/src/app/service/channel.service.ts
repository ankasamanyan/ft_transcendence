import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User, Users} from "../domain/user";
import {UsersRequest, UsersResponse} from "./dto/users.dto";
import {Channel, Channels} from "../domain/channel";
import {ChannelRequest, ChannelResponse, ChannelsResponse} from "./dto/channel.dto";
import {OurSocket} from "../socket/socket";
import {ChannelUpdate} from "../domain/channel-update";
import {ChannelUpdateRequest} from "./dto/channel-update.dto";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private httpClient: HttpClient,
    private socket: OurSocket) { }

  updateChannels: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addChannelInformation(users: User[]) {
    return this.httpClient.post<void>("http://localhost:3000/channels", UsersRequest.fromDomain(new Users(users)));
  }

  getChannels(userId: number): Observable<Channels> {
    return this.httpClient.get<ChannelsResponse>("http://localhost:3000/channels/get-channels/" + userId).pipe(
        map((response: ChannelsResponse) => {
          return ChannelsResponse.toDomain(response);
        }));
  }

  getChannelsAvailableWhenSearching(userId: number): Observable<Channels> {
    return this.httpClient.get<ChannelsResponse>("http://localhost:3000/channels/joined-public-protected-channels/" + userId).pipe(
      map((response: ChannelsResponse) => {
        return ChannelsResponse.toDomain(response);
      }));
  }

  getChannelDetailsById(channelId: number) {
    return this.httpClient.get<ChannelResponse>("http://localhost:3000/channels/details/" + channelId).pipe(
        map((response: ChannelResponse) => {
          return ChannelResponse.toDomain(response);
        }));
  }

  addChannelParticipants(channel: Channel) {
    return this.httpClient.post<void>("http://localhost:3000/channels/participants", ChannelRequest.fromDomain(channel));
  }

  getChannelParticipants(channelId: number) {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/channels/participants/" + channelId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  addChannelAdmin(channel: Channel) {
    return this.httpClient.post<void>("http://localhost:3000/channels/admins", ChannelRequest.fromDomain(channel));
  }

  getChannelAdmins(channelId: number) {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/channels/admins/" + channelId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  renameChannel(channel: Channel) {
    return this.socket.emit('channelRename', ChannelRequest.fromDomain(channel));
  }

  changeChannelType(channel: Channel) {
    return this.socket.emit('channelTypeChange', ChannelRequest.fromDomain(channel));
  }

  deletePassword(channelId: number) {
    return this.socket.emit('passwordRemoval', channelId);
  }

  setPassword(channel: Channel) {
    return this.socket.emit('passwordChange', ChannelRequest.fromDomain(channel));
  }

  assignAdmins(channelUpdate: ChannelUpdate) {
    return this.socket.emit('newAdmins', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  removeAdmins(channelUpdate: ChannelUpdate) {
    return this.socket.emit('adminsNoMore', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  kickUsers(channelUpdate: ChannelUpdate) {
    return this.socket.emit('participantsNoMore', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  banUsers(channelUpdate: ChannelUpdate) {
    return this.socket.emit('participantsNeverAgain', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  muteUsers(channelUpdate: ChannelUpdate) {
    return this.socket.emit('participantHush', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  leaveChannel(channelUpdate: ChannelUpdate) {
    return this.socket.emit('participantLeaving', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  enterChannel(channelUpdate: ChannelUpdate) {
    return this.socket.emit('participantJoining', ChannelUpdateRequest.fromDomain(channelUpdate));
  }

  isMuted(userId: number, channelId: number) {
    return this.httpClient.get<boolean>("http://localhost:3000/channels/muted-users/" + channelId + "/" + userId);
  }

  initializeChannels() {
    return this.httpClient.post<void>("http://localhost:3000/channels/mocks", {});
  }
}
