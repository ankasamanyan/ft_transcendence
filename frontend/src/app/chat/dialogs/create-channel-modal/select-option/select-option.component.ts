import {Component, Input} from '@angular/core';
import {User} from "../../../../domain/user";

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent {
  @Input()
  user: User |undefined;

  isSelected: boolean = false;
}
