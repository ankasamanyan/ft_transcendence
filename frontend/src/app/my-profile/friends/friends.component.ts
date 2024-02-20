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

  public friendsList!: User[] | undefined;

  public pendingList!: User[] | undefined;

  public blockedList!: User[] | undefined;

  public placeHolderMessage: string = 'This list is currently empty 🤷🏻‍♀️'

  constructor ( private friendService: FriendService,
                private blockedUsersService: BlockedUsersService) { }
  
  ngOnInit(): void {

    this.friendService.getFriends(this.userId)
      .subscribe((friends) => {
        this.friendsList = friends.users;
      });

    this.blockedUsersService.getBlockedUsers(this.userId)
      .subscribe((blocked) => {
        this.blockedList = blocked.users;
      });

    this.friendService.getPendingFriendRequests(this.userId)
      .subscribe((pending) => {
        this.pendingList = pending.users;
      });
  }


}