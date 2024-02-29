import { Injectable } from '@angular/core';
import {OurSocket} from "../socket/socket";
import {Users} from "../domain/user";
import {UsersRequest, UsersResponse} from "./dto/users.dto";
import {HttpClient} from "@angular/common/http";
import { MatchHistory, MatchHistoryDto, MatchHistoryList } from './dto/game.dto';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {



  constructor(private socket: OurSocket, private httpClient: HttpClient) { }

  host = "10.64.250.217";
  private backendUrl =  `http://10.64.250.217:3000`;

  invite(users: Users) {
    return this.socket.emit('invitationToPlay', UsersRequest.fromDomain(users));
  }

  accept(users: Users) {
    return this.socket.emit('acceptanceOfInvitation', UsersRequest.fromDomain(users));
  }

  decline(users: Users) {
    return this.socket.emit('rejectionOfInvitation', UsersRequest.fromDomain(users));
  }

  joinQueue(userId: number) {
    return this.socket.emit('joinQueue', {userId: userId});
  }

  leaveQueue(userId: number) {
    return this.socket.emit('leaveQueue', {userId: userId});
  }

  checkQueue() {
    return this.socket.emit('checkQueue');
  }

  isInvitationAlreadySent(initiatorId: number, recipientId: number) {
    return this.httpClient.get<boolean>(`http://${this.host}:3000/game/invitations/exists/` + initiatorId + "/" + recipientId);
  }

  getMatchHistory(userId: number) {
    return this.httpClient.get<MatchHistoryDto[]>(`${this.backendUrl}/game/history/` + userId)
    .pipe(map((response: MatchHistoryDto[]) => {
        const matchHistoryList: MatchHistory[] = response.map(dto =>
            new MatchHistory(
                dto.name,
                dto.username,
                dto.opponentName,
                dto.opponentUsername,
                dto.myMatchResult,
                dto.opponentMatchResult,
                dto.profilePicture,
                dto.opponentProfilePicture
            )
        );
        return new MatchHistoryList(matchHistoryList);
    }));
  }

  getInvitationsByRecipientId(recipientId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>(`${this.backendUrl}/game/invitations/` + recipientId)
      .pipe(map((response: UsersResponse) => {
        return UsersResponse.toDomain(response);
      }));
  }
}
