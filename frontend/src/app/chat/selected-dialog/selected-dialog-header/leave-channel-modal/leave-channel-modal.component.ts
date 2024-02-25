import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-leave-channel-modal',
  templateUrl: './leave-channel-modal.component.html',
  styleUrls: ['./leave-channel-modal.component.css']
})
export class LeaveChannelModalComponent {
  @Output()
  modalClose = new EventEmitter<boolean>();

}
