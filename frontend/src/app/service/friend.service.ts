import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User, Users} from "../domain/user";
import {UsersRequest, UsersResponse} from "./dto/users.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private httpClient: HttpClient) { }

  host =  environment.ip;
  private backendUrl =  `http://${this.host}:3000`;

  sendAFriendRequest(users: Users): Observable<void> {
    return this.httpClient.post<void>(
        `${this.backendUrl}/friends`,
        UsersRequest.fromDomain(users));
  }

  getFriends(userId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>(`${this.backendUrl}/friends/` + userId).pipe(
        map((response: UsersResponse) => {
          return UsersResponse.toDomain(response);
        }));
  }

  befriendable(sentUserId: number, receivedUserId: number) {
    return this.httpClient.get<boolean>(`${this.backendUrl}/friends/befriendable/` + sentUserId + "/" + receivedUserId);
  }

  initializeFriends() {
    return this.httpClient.post<void>(`${this.backendUrl}/friends/mocks`, {});
  }

  getPendingFriendRequests(userId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>(`${this.backendUrl}/friends/pending/` + userId).pipe(
      map((response: UsersResponse) => {
        return UsersResponse.toDomain(response);
      }));
  }

  acceptFriendRequest(users: Users):Observable<void> {
    return this.httpClient.put<void>(`${this.backendUrl}/friends/accept`, UsersRequest.fromDomain(users));
  }

  declineFriendRequest(users: Users):Observable<void> {
    return this.httpClient.put<void>(`${this.backendUrl}/friends/reject`, UsersRequest.fromDomain(users));
  }

  uploadProfilePicture(file: File, userId: number | undefined) {
		const formData = new FormData();
		formData.append("file", file);
		return this.httpClient.post<any>(`${this.backendUrl}/upload/` + userId, formData);
	}
}
