import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, Users} from "../domain/user";
import {UsersResponse} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(userId: string): Observable<Users> {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/users/" + userId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }
}
