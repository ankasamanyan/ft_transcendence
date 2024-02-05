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
  showInvitedNotification: boolean = false;
  showBefriendedNotification: boolean = false;

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showInviteNotificationForFewSeconds() {
    this.showInvitedNotification = true;
    this.sleep(2000).then(() => { this.showInvitedNotification = false; });
  }

  showBefriendNotificationForFewSeconds() {
    this.showBefriendedNotification = true;
    this.sleep(2000).then(() => { this.showBefriendedNotification = false; });
  }


}
