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

  getTime() {
    return new Date(this.dialog!.lastMessageDate).getHours()+ "." + new Date(this.dialog!.lastMessageDate).getMinutes().toString().padStart(2, "0");
  }
}
