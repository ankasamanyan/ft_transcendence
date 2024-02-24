import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User, Users} from "../../domain/user";
import { BlockedUsersService } from 'src/app/service/blocked-users.service';
import { UsersService } from 'src/app/service/users.service';
import { OurSocket } from 'src/app/socket/socket';

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit {

  @Input() userId!: number;

  private me!: User;

  public friendsList: User[] = [];

  public pendingList: User[] = [];

  public blockedList: User[] = [];

  public inviteList: User[] = [];

  public placeHolderMessage: string = 'This list is currently empty 🤷🏻‍♀️'

  constructor (
    private friendService: FriendService,
    private blockedUsersService: BlockedUsersService,
    private usersService: UsersService,
    private socket: OurSocket) {
    
    socket.on("FriendRequestAccepted", ({userId, userId2}: {userId: number, userId2: number}) => {
      console.log("got the emit on frontend")
      if (this.me.id === userId || this.me.id === userId2) {
        this.friendService.getPendingFriendRequests(this.userId)
        .subscribe((pending) => {
          if (pending.users.length) {
            this.pendingList = pending.users;
          } else {this.pendingList = [];}
        });
      }
      console.log("new pendinglist " + this.pendingList)
      // this.acceptFriendRequest()
    })
  }
  
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

    this.usersService.getUserById(this.userId)
      .subscribe((user) => {
        this.me = user;
      });
  }

  inviteToPlay(){
    //game invitation
  }

  blockUser(blockee: User) {
    this.blockedUsersService.blockUser(new Users([this.me, blockee])).subscribe(() => {});
  }

  unBlock(blocked: User) {
    this.blockedUsersService.unblockUser(new Users([this.me, blocked])).subscribe(() => {});
  }

  acceptFriendRequest(newFriend: User) {
    // this.friendService.acceptFriendRequest(new Users([newFriend, this.me])).subscribe(() => {});
    this.socket.emit("acceptFriendRequest", {newFriend: newFriend, meUser: this.me});
  }
  
  declineFriendRequest(notFriend: User) {
    this.friendService.declineFriendRequest(new Users([notFriend, this.me])).subscribe(() => {});
  }

}