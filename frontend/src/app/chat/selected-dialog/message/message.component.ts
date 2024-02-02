import {Component, Input} from '@angular/core';
import {Message} from "../../../domain/message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input()
  message: Message | undefined;

  determineColorPosition() {
    if (this.message?.senderId == 0)
      return "background-color: var(--color-orange); color: white; display: block; margin-left: auto;"
    else
      return "background-color: var(--color-light-blue);"
  }

  getTime() {
    return new Date(this.message!.date).getHours()+ "." + new Date(this.message!.date).getMinutes().toString().padStart(2, "0");
  }
}
