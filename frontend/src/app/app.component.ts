import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "./service/users.service";
import {MessageService} from "./service/message.service";
import {FriendService} from "./service/friend.service";
import {ChannelService} from "./service/channel.service";
import { SharedDataService } from './service/shared-data.service';

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
      private friendService: FriendService,
      private channelService: ChannelService,
  ) {
    this.usersService.initializeUsers().subscribe();
    this.friendService.initializeFriends().subscribe();

    this.channelService.initializeChannels().subscribe();
    this.messageService.initializeChannelMessages().subscribe();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
