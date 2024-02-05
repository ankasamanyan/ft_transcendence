import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-invitation-to-play-received-notification',
  templateUrl: './invitation-to-play-received-notification.component.html',
  styleUrls: ['./invitation-to-play-received-notification.component.css']
})
export class InvitationToPlayReceivedNotificationComponent {
  @Output()
  notificationClose = new EventEmitter<void>();

  @Input()
  selectedPerson: User | undefined;
}
