import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {Users} from "../domain/user";
import {UsersRequest, UsersResponse} from "./dto/users.dto";
import {OurSocket} from "../socket/socket";

@Injectable({
  providedIn: 'root'
})
export class BlockedUsersService {

  constructor(private httpClient: HttpClient, private socket: OurSocket) { }

  blockUser(users: Users) {
    return this.socket.emit('userBlocking', UsersRequest.fromDomain(users));
  }
  
  unblockUser(users: Users): Observable<void> {
    const blockerId = users.users[0].id;
    const blockedId = users.users[1].id;
    return this.httpClient.delete<void>(`http://localhost:3000/blocked-users?blockerId=${blockerId}&blockedId=${blockedId}`);
  }

  getBlockedUsers(userId: number) {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/blocked-users/"+ userId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  isBlocked(blockerId: number, blockedId: number) {
    return this.httpClient.get<boolean>("http://localhost:3000/blocked-users/is-blocked/"+ blockerId + "/" + blockedId);
  }
}
