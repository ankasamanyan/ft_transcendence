import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../domain/user";
import {UsersRequest} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class BlockedUsersService {

  constructor(private httpClient: HttpClient) { }

  blockUser(users: Users): Observable<void> {
    return this.httpClient.post<void>("http://localhost:3000/blocked-users", UsersRequest.fromDomain(users));
  }
  
  unblockUser(users: Users): Observable<void> {
    const blockerId = users.users[0].id;
    const blockedId = users.users[1].id;
    return this.httpClient.delete<void>(`http://localhost:3000/blocked-users?blockerId=${blockerId}&blockedId=${blockedId}`);
  }
}
