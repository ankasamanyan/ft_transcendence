import {Component, Input} from '@angular/core';
import {User} from "../../../domain/user";

@Component({
  selector: 'app-selected-dialog-header',
  templateUrl: './selected-dialog-header.component.html',
  styleUrls: ['./selected-dialog-header.component.css']
})
export class SelectedDialogHeaderComponent {
  @Input()
  selectedPerson: User | undefined;

  showBlockModal: boolean = false;
  showInvitedToPlayNotification: boolean = false;
  showInvitedToBeFriendsNotification: boolean = false;

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showInviteNotificationForFewSeconds() {
    this.showInvitedToPlayNotification = true;
    this.sleep(2000).then(() => { this.showInvitedToPlayNotification = false; });
  }

  showBefriendNotificationForFewSeconds() {
    this.showInvitedToBeFriendsNotification = true;
    this.sleep(2000).then(() => { this.showInvitedToBeFriendsNotification = false; });
  }


}
