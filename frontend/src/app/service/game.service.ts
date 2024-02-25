import { Injectable } from '@angular/core';
import {OurSocket} from "../socket/socket";
import {Users} from "../domain/user";
import {UsersRequest} from "./dto/users.dto";
import {HttpClient} from "@angular/common/http";
import { MatchHistory, MatchHistoryDto, MatchHistoryList } from './dto/game.dto';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private socket: OurSocket, private httpClient: HttpClient) { }

  private backendUrl = 'http://localhost:3000';

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
}
