import {Component, Input} from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  @Input()
  navigationStatus: NavigationBarStatus | undefined;

  isGameSelected() {
    return this.navigationStatus == NavigationBarStatus.GAME;
  }

  isLeaderboardSelected() {
    return this.navigationStatus == NavigationBarStatus.LEADERBOARD;
  }

  isChatSelected() {
    return this.navigationStatus == NavigationBarStatus.CHAT;
  }

  isLogoutSelected() {
    return this.navigationStatus == NavigationBarStatus.LOGOUT;
  }
}
