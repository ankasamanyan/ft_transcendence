import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Users} from "../domain/user";
import {UsersRequest, UsersResponse} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private httpClient: HttpClient) { }

  private backendUrl = 'http://localhost:3000';

  sendAFriendRequest(users: Users): Observable<void> {
    return this.httpClient.post<void>(
        "http://localhost:3000/friends",
        UsersRequest.fromDomain(users));
  }

  getFriends(userId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/friends/" + userId).pipe(
        map((response: UsersResponse) => {
          return UsersResponse.toDomain(response);
        }));
  }

  befriendable(sentUserId: number, receivedUserId: number) {
    return this.httpClient.get<boolean>("http://localhost:3000/friends/" + sentUserId + "/" + receivedUserId);
  }

  initializeFriends() {
    return this.httpClient.post<void>("http://localhost:3000/friends/mocks", {});
  }

  getPendingFriendRequests(userId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>(`${this.backendUrl}/friends/pending/` + userId).pipe(
      map((response: UsersResponse) => {
        return UsersResponse.toDomain(response);
      }));
  }
}
