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

  showExitModal: boolean = false;

  isGameSelected() {
    return this.navigationStatus == NavigationBarStatus.GAME;
  }

  isChatSelected() {
    return this.navigationStatus == NavigationBarStatus.CHAT;
  }

  isLogoutSelected() {
    return this.navigationStatus == NavigationBarStatus.LOGOUT;
  }
}
