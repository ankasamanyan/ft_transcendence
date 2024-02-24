import {Component, EventEmitter, Output} from '@angular/core';
import {User} from "../../../domain/user";

@Component({
  selector: 'app-enter-password-modal',
  templateUrl: './enter-password-modal.component.html',
  styleUrls: ['./enter-password-modal.component.css']
})
export class EnterPasswordModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  authenticatedUser: User = new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true, false);

  enteredPassword: string | undefined;
  passwordEntered() {
    return this.enteredPassword !== "" && this.enteredPassword !== undefined;
  }
}
