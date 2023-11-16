import {Component, Input} from '@angular/core';
import {Dialog} from "../../../model/Dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input()
  dialog: Dialog | undefined;
}
