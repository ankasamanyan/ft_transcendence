import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User, Users} from "../domain/user";
import {UserResponse, UsersRequest, UsersResponse} from "./dto/users.dto";
import {Channel, Channels} from "../domain/channel";
import {ChannelRequest, ChannelResponse, ChannelsResponse} from "./dto/channel.dto";
import {OurSocket} from "../socket/socket";

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
    return this.httpClient.get<ChannelsResponse>("http://localhost:3000/channels/" + userId).pipe(
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

  initializeChannels() {
    return this.httpClient.post<void>("http://localhost:3000/channels/mocks", {});
  }
}
