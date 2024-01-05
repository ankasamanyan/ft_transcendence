import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.css']
})
export class ExitModalComponent {
  @Output()
  modalClose = new EventEmitter<void>();
}
