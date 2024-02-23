import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlockedUsersService} from "../../../../service/blocked-users.service";
import {User, Users} from "../../../../domain/user";

@Component({
  selector: 'app-block-modal',
  templateUrl: './block-modal.component.html',
  styleUrls: ['./block-modal.component.css']
})
export class BlockModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  @Input()
  selectedPerson: User | undefined;

  constructor(private blockedUsersService: BlockedUsersService) {
  }

  blockUser() {
    this.blockedUsersService.blockUser(new Users([
        new User(1, "Anahit", "@akasaman", "assets/placeholderAvatar.jpeg", "", true),
        new User(this.selectedPerson!.id, this.selectedPerson!.name, this.selectedPerson!.intraLogin, "assets/placeholderComrade2.jpeg", "", true)
    ]));
    this.modalClose.emit();
  }
}
