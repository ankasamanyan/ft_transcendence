import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Users } from "../domain/user";
import { UsersRequest, UsersResponse } from "./dto/users.dto";
import {OurSocket} from "../socket/socket";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlockedUsersService {

  private backUrl = environment.ip

  constructor(private httpClient: HttpClient, private socket: OurSocket) { }

  blockUser(users: Users) {
    return this.socket.emit('userBlocking', UsersRequest.fromDomain(users));
  }
  
  unblockUser(users: Users): Observable<void> {
    return this.socket.emit('userUnblocking', UsersRequest.fromDomain(users));
  }

  getBlockedUsers(userId: number) {
    return this.httpClient.get<UsersResponse>(`http://${this.backUrl}:3000/blocked-users/`+ userId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  isBlocked(blockerId: number, blockedId: number) {
    return this.httpClient.get<boolean>(`http://${this.backUrl}:3000/blocked-users/is-blocked/`+ blockerId + "/" + blockedId);
  }
}
