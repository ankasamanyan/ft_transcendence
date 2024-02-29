import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  constructor(private httpClient: HttpClient) { }

  private ip = environment.ip

  private backendUrl = `http://${this.ip}:3000`


  getWins(userId: number) {
    return this.httpClient.get<number>(`${this.backendUrl}/user-statistics/wins/` + userId);
  }

  getLosses(userId: number) {
    return this.httpClient.get<number>(`${this.backendUrl}/user-statistics/losses/` + userId);
  }

}
