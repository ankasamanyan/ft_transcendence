import {Component, Input} from '@angular/core';
import {Dialog} from "../../../../domain/dialog";

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent {
  @Input()
  dialog: Dialog |undefined;

  isSelected: boolean = false;
}
