import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-invitation-received-notification',
  templateUrl: './invitation-received-notification.component.html',
  styleUrls: ['./invitation-received-notification.component.css']
})
export class InvitationReceivedNotificationComponent {
  @Output()
  notificationClose = new EventEmitter<void>();
  selectedPerson: string = "Cedric";
}
