import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Message} from "../domain/message";
import {MessageRequest} from "./dto/selected-dialog.dto";
import {ChannelMessage} from "../domain/channel-message";
import {ChannelMessageRequest, ChannelMessageResponse} from "./dto/channel-message.dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  initializeChannelMessages() {
    return this.httpClient.post<void>("http://localhost:3000/messages/mocks2", {});
  }

  getChannelMessages(channelId: number) {
    return this.httpClient.get<ChannelMessageResponse[]>("http://localhost:3000/messages/" + channelId).pipe(
        map((responses: ChannelMessageResponse[]) => {
          return responses.map(response => ChannelMessageResponse.toDomain(response));
        }));
  }

  saveChannelMessage(message: ChannelMessage): Observable<void> {
    return this.httpClient.post<void>(
        "http://localhost:3000/messages/channelMessage",
        ChannelMessageRequest.fromDomain(message));
  }
}
