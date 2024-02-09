import { Component } from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  protected readonly NavigationBarStatus = NavigationBarStatus;

  selectedChannelId: number | undefined;

  constructor() {
  }

  saveSelectedChannel(selectedChannelId: number) {
    this.selectedChannelId = selectedChannelId;
  }
}
