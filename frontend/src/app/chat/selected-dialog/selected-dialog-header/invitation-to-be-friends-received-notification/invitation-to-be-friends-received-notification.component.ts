import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-invitation-to-be-friends-received-notification',
  templateUrl: './invitation-to-be-friends-received-notification.component.html',
  styleUrls: ['./invitation-to-be-friends-received-notification.component.css']
})
export class InvitationToBeFriendsReceivedNotificationComponent {
  @Output()
  notificationClose = new EventEmitter<void>();

  @Input()
  selectedPerson: User | undefined;
}
