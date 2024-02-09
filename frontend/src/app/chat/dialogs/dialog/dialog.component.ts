import {Component, Input} from '@angular/core';
import {Channel} from "../../../domain/channel";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input()
  channel: Channel | undefined;

  getTime() {
    if (this.channel!.lastMessageCreatedAt) {
      return new Date(this.channel!.lastMessageCreatedAt!).getHours()+ "." + new Date(this.channel!.lastMessageCreatedAt!).getMinutes().toString().padStart(2, "0");
    }
    return "";
  }
}
