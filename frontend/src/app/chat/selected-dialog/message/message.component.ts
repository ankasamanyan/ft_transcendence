import {Component, Input} from '@angular/core';
import {Message} from "../../../domain/message";
import {ChannelMessage} from "../../../domain/channel-message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input()
  message: ChannelMessage | undefined;

  determineColorPosition() {
    if (this.message?.senderId == 1)
      return "background-color: var(--color-orange); color: white; display: block; margin-left: auto;"
    else
      return "background-color: var(--color-light-blue);"
  }

  getTime() {
    return new Date(this.message!.created_at).getHours()+ "." + new Date(this.message!.created_at).getMinutes().toString().padStart(2, "0");
  }
}
