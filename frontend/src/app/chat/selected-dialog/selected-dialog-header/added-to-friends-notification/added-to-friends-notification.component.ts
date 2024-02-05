import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-added-to-friends-notification',
  templateUrl: './added-to-friends-notification.component.html',
  styleUrls: ['./added-to-friends-notification.component.css']
})
export class AddedToFriendsNotificationComponent {
  @Output()
  notificationClose = new EventEmitter<void>();

  @Input()
  selectedPerson: User | undefined;
}
