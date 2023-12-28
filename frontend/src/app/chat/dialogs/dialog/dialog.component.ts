import {Component, Input} from '@angular/core';
import {Dialog} from "../../../domain/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input()
  dialog: Dialog | undefined;
}
