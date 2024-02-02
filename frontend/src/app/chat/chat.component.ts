import { Component } from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";
import {User} from "../domain/user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  protected readonly NavigationBarStatus = NavigationBarStatus;

  selectedPerson: User | undefined;

  saveSelectedPerson(selectedPerson: User) {
    this.selectedPerson = selectedPerson;
  }
}
