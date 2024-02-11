import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {ChannelMessage} from "../domain/channel-message";
import {ChannelMessageRequest, ChannelMessageResponse} from "./dto/channel-message.dto";
import {OurSocket} from "../socket/socket";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient, private socket: OurSocket) { }

  initializeChannelMessages() {
    return this.httpClient.post<void>("http://localhost:3000/messages/mocks2", {});
  }

  getChannelMessages(channelId: number) {
    return this.httpClient.get<ChannelMessageResponse[]>("http://localhost:3000/messages/" + channelId).pipe(
        map((responses: ChannelMessageResponse[]) => {
          return responses.map(response => ChannelMessageResponse.toDomain(response));
        }));
  }

  saveChannelMessage(message: ChannelMessage) {
    return this.socket.emit('message', ChannelMessageRequest.fromDomain(message));
  }
}
