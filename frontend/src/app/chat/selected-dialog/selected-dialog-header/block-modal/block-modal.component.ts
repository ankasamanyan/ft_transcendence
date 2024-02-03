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

  constructor(public blockedUsersService: BlockedUsersService) {
  }

  blockUser() {
    this.blockedUsersService.blockUser(new Users([
        new User(0, "Anahit", "assets/placeholderAvatar.jpeg"),
        new User(1, this.selectedPerson!.name, "assets/placeholderComrade2.jpeg"),
    ])).subscribe(()=> {
      this.modalClose.emit();
    });
  }
}
