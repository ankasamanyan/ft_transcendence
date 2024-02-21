import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "./service/users.service";
import {MessageService} from "./service/message.service";
import {FriendService} from "./service/friend.service";
import {ChannelService} from "./service/channel.service";
import { SharedDataService } from './service/shared-data.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

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
      private sharedDataService: SharedDataService,
  ) {
    this.usersService.initializeUsers().subscribe();
    this.friendService.initializeFriends().subscribe();

    this.channelService.initializeChannels().subscribe();
    this.messageService.initializeChannelMessages().subscribe();
    //get the current userId here
    const trToken = Cookie.get('accessToken')
    localStorage.setItem('tr_access_token', trToken)
    let id = Number(Cookie.get('id'))
    // if(id){
      this.sharedDataService.setData(id);
    // }

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
