import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent {
  @Input()
  user: User |undefined;

  @Output()
  selectedStatusChanged = new EventEmitter<boolean>();

  isSelected: boolean = false;

  changeSelectedStatus() {
    this.isSelected = !this.isSelected;
    this.selectedStatusChanged.emit(this.isSelected);
  }
}
