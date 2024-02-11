import { Component, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User} from "../../domain/user";

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit {
  public friendsList!: User[];
  public pendingList!: any[];
  public blockedList!: any[];
  public placeHolderMessage: string = 'This list is currently empty 🤷🏻‍♀️'


  constructor(private friendService: FriendService) {
    this.friendService.getFriends(1).subscribe((value)=> {
      this.friendsList = value.users;
    })
  }

  ngOnInit(): void {
    this.pendingList = [
      { 
        name: 'Fedia', 
        picture: '../../../assets/placeholderComrade5.jpeg',
        intraLogin: '@fstaryk',

      },];
      this.blockedList = [
        { 
          name: 'Wolf', 
          picture: '../../../assets/placeholderComrade6.jpeg',
          intraLogin: '@wmardin',
  
        },];
  }

}