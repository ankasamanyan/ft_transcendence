import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-edit-channel-modal',
  templateUrl: './edit-channel-modal.component.html',
  styleUrls: ['./edit-channel-modal.component.css']
})
export class EditChannelModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();
}
