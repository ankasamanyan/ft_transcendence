import { Component } from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  protected readonly NavigationBarStatus = NavigationBarStatus;

  selectedPerson: string | undefined;

  saveSelectedPerson(selectedPerson: string) {
    this.selectedPerson = selectedPerson;
  }
}
