import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User} from "../../domain/user";

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit {
  public friendsList: any[] = [];
  public placeHolderMessage: string = 'This list is currently empty 🤷🏻‍♀️'
  friends: User[] | undefined;

  constructor(private friendService: FriendService) {
    this.friendService.getFriends(1).subscribe((value)=> {
      this.friends = value.users;
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

}