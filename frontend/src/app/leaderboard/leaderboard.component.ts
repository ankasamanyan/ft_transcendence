import { Component } from '@angular/core';
import {NavigationBarStatus} from "../model/NavigationBar";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  protected readonly NavigationBarStatus = NavigationBarStatus;
}
