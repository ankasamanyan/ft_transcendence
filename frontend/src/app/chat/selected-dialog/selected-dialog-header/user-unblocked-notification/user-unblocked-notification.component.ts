import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-user-unblocked-notification',
  templateUrl: './user-unblocked-notification.component.html',
  styleUrls: ['./user-unblocked-notification.component.css']
})
export class UserUnblockedNotificationComponent {
  @Output()
  notificationClose = new EventEmitter<void>();

  @Input()
  selectedPerson: User | undefined;
}
