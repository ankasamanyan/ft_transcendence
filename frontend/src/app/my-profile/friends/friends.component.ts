import { Component, Input, OnInit } from '@angular/core';
import { FriendService } from "../../service/friend.service";
import { User } from "../../domain/user";

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit {

  @Input() userId!: number;

  public friendsList!: User[];

  public pendingList!: User[];

  public blockedList!: User[];

  public placeHolderMessage: string = 'This list is currently empty 🤷🏻‍♀️'


  constructor(private friendService: FriendService) { }
  
  ngOnInit(): void {
    this.friendService.getFriends(this.userId)
      .subscribe((friends)=> {
        this.friendsList = friends.users;
      });
    this.pendingList = [
    { 
      id: 2,
      name: 'Fedia', 
      picture: '../../../assets/placeholderComrade5.jpeg',
      intraLogin: '@fstaryk',
      
    },];
    this.blockedList = [
    { 
      id: 3,
      name: 'Wolf', 
      picture: '../../../assets/placeholderComrade6.jpeg',
      intraLogin: '@wmardin',

    },];
  }

}