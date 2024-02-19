import { Injectable } from '@angular/core';
import {OurSocket} from "../socket/socket";
import {ChannelMessage} from "../domain/channel-message";
import {ChannelMessageRequest} from "./dto/channel-message.dto";
import {Users} from "../domain/user";
import {UsersRequest} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private socket: OurSocket) { }

  invite(users: Users) {
    return this.socket.emit('invitationToPlay', UsersRequest.fromDomain(users));
  }
}
