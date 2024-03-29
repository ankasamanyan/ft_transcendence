import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, Users} from "../domain/user";
import {UserRequest, UserResponse, UsersRequest, UsersResponse} from "./dto/users.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  host = environment.ip;
  // host = process.env["API_KEY"]

  constructor(private httpClient: HttpClient) { }

  initializeUsers() {
    return this.httpClient.post<void>(`http://${this.host}:3000/users/mocks`, {});
  }

  addUser(user: User) {
    return this.httpClient.post<void>(`http://${this.host}:3000/users/new-user`, UserRequest.fromDomain(user));
  }

  getUserById(userId: number){
    return this.httpClient.get<UserResponse>(`http://${this.host}:3000/users/details/` + userId).pipe(
        map((users: UserResponse) => {
          return UserResponse.toDomain(users);
        }));
  }

  getUsers(userId: number): Observable<Users> {
    return this.httpClient.get<UsersResponse>(`http://${this.host}:3000/users/all-except-for/` + userId).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  getAllUsers(): Observable<Users> {
    return this.httpClient.get<UsersResponse>(`http://${this.host}:3000/users/all/users`).pipe(
      map((users: UsersResponse) => {
        return UsersResponse.toDomain(users);
      }));
  }

  updateUser(user: User) {
    return this.httpClient.put<UserResponse>(`http://${this.host}:3000/users/update`, UserRequest.fromDomain(user));
  }
}
