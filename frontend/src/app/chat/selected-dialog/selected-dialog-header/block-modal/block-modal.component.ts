import {Component, EventEmitter, Input, Output} from '@angular/core';

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
}
