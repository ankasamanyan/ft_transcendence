import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, Users} from "../domain/user";
import {UserRequest, UserResponse, UsersResponse} from "./dto/users.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  initializeUsers() {
    return this.httpClient.post<void>("http://localhost:3000/users/mocks", {});
  }

  addUser(user: User) {
    return this.httpClient.post<void>("http://localhost:3000/users/new-user", UserRequest.fromDomain(user));
  }

  getUserById(userId: number){
    return this.httpClient.get<UserResponse>("http://localhost:3000/users/details/" + userId).pipe(
        map((users: UserResponse) => {
          return UserResponse.toDomain(users);
        }));
  }

  getUsers(userId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/users/all-except-for/" + userId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  getAllUsers(): Observable<Users> {
    return this.httpClient.get<UsersResponse>("http://localhost:3000/users/all/users").pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }
}
