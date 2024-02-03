import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Users} from "../domain/user";
import {Observable} from "rxjs";
import {UsersRequest} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  createChannel(users: Users): Observable<void> {
    return this.httpClient.post<void>("http://localhost:3000/channels", UsersRequest.fromDomain(users));
  }
}
