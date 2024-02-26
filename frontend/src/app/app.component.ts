import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "./service/users.service";
import {MessageService} from "./service/message.service";
import {FriendService} from "./service/friend.service";
import {ChannelService} from "./service/channel.service";
import { SharedDataService } from './service/shared-data.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {OurSocket} from "./socket/socket";
import {User} from "./domain/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showWannaPlayModal: boolean = false;
  whoInvitedMeToPlay: User | undefined;

  authenticatedUser: User | undefined;

  constructor(
      private socket: OurSocket,
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
    this.sharedDataService.setMyUserId(id);
    
    this.sharedDataService.getMyUserId$()
    .subscribe(data => {
      this.sharedDataService.setData(id);
    })
    // }
    socket.on("invitationSent",({invitedId, beenInvitedId}: { invitedId: number, beenInvitedId: number }) => {
      if (beenInvitedId === this.authenticatedUser?.id) {
        this.usersService.getUserById(invitedId).subscribe((value) => {
          this.whoInvitedMeToPlay = value;
          this.showWannaPlayModal = true;
        })
      }
    });
  }

  ngOnInit() {
    this.sharedDataService.getMyUserId$().subscribe((value) => {
      this.usersService.getUserById(value).subscribe((user) => {
        this.authenticatedUser = user;
      });
    });


    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
      const colorScheme = JSON.parse(savedColorScheme);
      this.changeColorScheme(
        colorScheme.primaryColor,
        colorScheme.secondaryColor,
        colorScheme.orangeColor,
        colorScheme.backgroundColor,
        colorScheme.darkerOrangeColor,
        colorScheme.lightBlueLighterColor,
        colorScheme.lightBlueDarkerColor,
        colorScheme.lightGreyColor
      );
    }

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  
  changeColorScheme (
    primaryColor: string,
    secondaryColor: string,
    orangeColor: string,
    backgroundColor: string,
    darkerOrangeColor: string,
    lightBlueLighterColor: string,
    lightBlueDarkerColor: string,
    lightGreyColor:string ): void {

    document.documentElement.style.setProperty('--color-orange', orangeColor);
    document.documentElement.style.setProperty('--color-orange-darker', darkerOrangeColor);
    document.documentElement.style.setProperty('--color-light-blue', backgroundColor);
    document.documentElement.style.setProperty('--color-light-blue-lighter', lightBlueLighterColor);
    document.documentElement.style.setProperty('--color-light-blue-darker', lightBlueDarkerColor);
    document.documentElement.style.setProperty('--color-light-gray', lightGreyColor);
    document.documentElement.style.setProperty('--color-dark-blue', primaryColor);
    document.documentElement.style.setProperty('--color-secondary', secondaryColor);

    localStorage.setItem('colorScheme', JSON.stringify({ orangeColor, darkerOrangeColor, backgroundColor, lightBlueLighterColor, lightBlueDarkerColor, lightGreyColor, primaryColor, secondaryColor}));

  }
}
