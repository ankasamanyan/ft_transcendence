import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../domain/user";
import {UsersRequest} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private httpClient: HttpClient) { }

  sendAFriendRequest(users: Users): Observable<void> {
    return this.httpClient.post<void>(
        "http://localhost:3000/friends",
        UsersRequest.fromDomain(users));
  }
}
