import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User, Users} from "../domain/user";
import {UsersRequest} from "./dto/users.dto";
import {Channels} from "../domain/channel";
import {ChannelsResponse} from "./dto/channel.dto";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  addChannelInformation(users: User[]): Observable<void> {
    return this.httpClient.post<void>("http://localhost:3000/channels", UsersRequest.fromDomain(new Users(users)));
  }

  getChannels(userId: number): Observable<Channels> {
    return this.httpClient.get<ChannelsResponse>("http://localhost:3000/channels/" + userId).pipe(
        map((response: ChannelsResponse) => {
          return ChannelsResponse.toDomain(response);
        }));
  }

  initializeChannels() {
    return this.httpClient.post<void>("http://localhost:3000/channels/mocks", {});
  }
}
