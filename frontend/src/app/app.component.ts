import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "./service/users.service";
import {MessageService} from "./service/message.service";
import {FriendService} from "./service/friend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
      private modalService: NgbModal,
      private usersService: UsersService,
      private messageService: MessageService,
      private friendService: FriendService
  ) {
    this.usersService.initializeUsers().subscribe();
    this.messageService.initializeMessages().subscribe();
    this.friendService.initializeFriends().subscribe();

    this.messageService.initializeChannelMessages().subscribe();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
