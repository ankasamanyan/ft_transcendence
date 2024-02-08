import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../domain/message";
import {MessageRequest} from "./dto/selected-dialog.dto";
import {ChannelMessage} from "../domain/channel-message";
import {ChannelMessageRequest} from "./dto/channel-message.dto";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  initializeMessages() {
    return this.httpClient.post<void>("http://localhost:3000/messages/mocks", {});
  }

  initializeChannelMessages() {
    return this.httpClient.post<void>("http://localhost:3000/messages/mocks2", {});
  }

  saveMessage(message: Message): Observable<void> {
    return this.httpClient.post<void>(
      "http://localhost:3000/messages",
      MessageRequest.fromDomain(message));
  }

  saveChannelMessage(message: ChannelMessage): Observable<void> {
    return this.httpClient.post<void>(
        "http://localhost:3000/messages/channelMessage",
        ChannelMessageRequest.fromDomain(message));
  }
}
