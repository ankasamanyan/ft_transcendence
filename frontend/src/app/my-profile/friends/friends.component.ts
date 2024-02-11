import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User} from "../../domain/user";
import { BlockedUsersService } from 'src/app/service/blocked-users.service';

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit {
  public friendsList: any[] = [];
  public placeHolderMessage: string = 'This list is currently empty 🤷🏻‍♀️'
  friends: User[] | undefined;

  constructor(private friendService: FriendService, private blockedUsersService: BlockedUsersService) {
    this.friendService.getFriends(1).subscribe((value)=> {
      this.friends = value.users;
    })
    this.blockedUsersService.getBlockedUsers(0).subscribe((value)=> {
      console.log(value);
    })
  }

  ngOnInit(): void {
    this.friendsList = [
      { 
        name: 'Cedric Erdelen', 
        profilePicture: '../../../assets/placeholderComrade2.jpeg',
        username: '@cerdelen',

      },
      { 
        name: 'Tetiana Fedorenko',
        profilePicture: '../../../assets/placeholderComrade.jpeg',
        username: '@tfedoren',
      },
      { 
        name: 'Kristiyana Milcheva',
        profilePicture: '../../../assets/placeholderComrade3.jpeg',
        username: '@kmilchev',
      },
    ];
  }

  getBlockedUsers(userId: number) {

  }

}