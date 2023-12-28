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
    if (this.message?.senderId == "Anahit")
      return "background-color: #de3737; color: white; display: block; margin-left: auto;"
    else
      return "background-color: #e6eef2;"
  }
}
