import { Component, Input, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User} from "../../domain/user";
import { BlockedUsersService } from 'src/app/service/blocked-users.service';

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

  constructor ( private friendService: FriendService,
                private blockedUsersService: BlockedUsersService) { }
  
  ngOnInit(): void {

    this.friendService.getFriends(this.userId)
      .subscribe((friends) => {
        if (friends.users.length) {
          this.friendsList = friends.users;
        } else {this.friendsList = [];}
      });

    this.friendService.getPendingFriendRequests(this.userId)
      .subscribe((pending) => {
        if (pending.users.length) {
          this.pendingList = pending.users;
        } else {this.pendingList = [];}
      });

    this.blockedUsersService.getBlockedUsers(this.userId)
      .subscribe((blocked) => {
        if (blocked.users.length) {
          this.blockedList = blocked.users;
        } else {this.blockedList = [];}
      });
  }
}