import { Injectable } from '@angular/core';
import {OurSocket} from "../socket/socket";
import {Users} from "../domain/user";
import {UsersRequest} from "./dto/users.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private socket: OurSocket, private httpClient: HttpClient) { }

  invite(users: Users) {
    return this.socket.emit('invitationToPlay', UsersRequest.fromDomain(users));
  }

  accept(users: Users) {
    return this.socket.emit('acceptanceOfInvitation', UsersRequest.fromDomain(users));
  }

  decline(users: Users) {
    return this.socket.emit('rejectionOfInvitation', UsersRequest.fromDomain(users));
  }

  isInvitationAlreadySent(initiatorId: number, recipientId: number) {
    return this.httpClient.get<boolean>("http://localhost:3000/game/invitations/exists/" + initiatorId + "/" + recipientId);
  }
}
