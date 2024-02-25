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

  @Input()
  authenticatedUser: User | undefined;

  constructor(private blockedUsersService: BlockedUsersService) {
  }

  blockUser() {
    this.blockedUsersService.blockUser(new Users([
        this.authenticatedUser!,
        this.selectedPerson!
    ]));
    this.modalClose.emit();
  }
}
