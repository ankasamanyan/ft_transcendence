import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  constructor(private httpClient: HttpClient) { }

  private backendUrl = 'http://10.64.250.217:3000'


  getWins(userId: number) {
    return this.httpClient.get<number>(`${this.backendUrl}/user-statistics/wins/` + userId);
  }

  getLosses(userId: number) {
    return this.httpClient.get<number>(`${this.backendUrl}/user-statistics/losses/` + userId);
  }

}
