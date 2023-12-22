import { Component } from '@angular/core';
import {NavigationBarStatus} from "../model/NavigationBar";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  protected readonly NavigationBarStatus = NavigationBarStatus;
}
