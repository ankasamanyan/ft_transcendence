import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BlockedUsersService} from "../../../../service/blocked-users.service";

@Component({
  selector: 'app-block-modal',
  templateUrl: './block-modal.component.html',
  styleUrls: ['./block-modal.component.css']
})
export class BlockModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  @Input()
  selectedPerson: string | undefined;

  constructor(blockedUsersService: BlockedUsersService) {
  }
}
