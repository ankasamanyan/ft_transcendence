import { Component } from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  protected readonly NavigationBarStatus = NavigationBarStatus;
}
