import { Component } from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";
import {User} from "../domain/user";
import {FriendService} from "../service/friend.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  protected readonly NavigationBarStatus = NavigationBarStatus;

  selectedPerson: User | undefined;
  selectedPersonBefriendable: boolean | undefined;

  constructor(private friendService: FriendService) {
  }

  saveSelectedPerson(selectedPerson: User) {
    this.selectedPerson = selectedPerson;
    this.friendService.befriendable(1, selectedPerson.id!).subscribe((value) => {
      this.selectedPersonBefriendable = value;
    })
  }
}
