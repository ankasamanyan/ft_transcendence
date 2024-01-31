import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Users} from "../../../domain/user";

@Component({
  selector: 'app-create-channel-modal',
  templateUrl: './create-channel-modal.component.html',
  styleUrls: ['./create-channel-modal.component.css']
})
export class CreateChannelModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();

  @Input()
  users: Users | undefined;
}
