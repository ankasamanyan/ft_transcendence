import {Component, EventEmitter, Output} from '@angular/core';
import {UsersService} from "../../../service/users.service";
import {Users} from "../../../domain/user";

@Component({
  selector: 'app-create-channel-modal',
  templateUrl: './create-channel-modal.component.html',
  styleUrls: ['./create-channel-modal.component.css']
})
export class CreateChannelModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  users: Users | undefined;
  constructor(usersService: UsersService) {
    usersService.getUsers("Anahit").subscribe((value)  => {
      this.users = value;
    });
  }
}
