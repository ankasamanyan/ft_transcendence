import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {FriendService} from "../../service/friend.service";
import {User, Users} from "../../domain/user";
import { BlockedUsersService } from 'src/app/service/blocked-users.service';
import { UsersService } from 'src/app/service/users.service';
import { OurSocket } from 'src/app/socket/socket';
import { Subject, takeUntil } from 'rxjs';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit, OnChanges {

  @Input() userId!: number;

  @Input() isThisMe!: boolean;

  private destroy$: Subject<void> = new Subject<void>();

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
    private socket: OurSocket,
    private sharedDataService: SharedDataService,
    private router: Router) {
    
  }
  
  ngOnInit(): void {
    this.getMeUser();
    this.getFriendList();
    this.getPendingRequestList();
    this.getBlockedUserList();

    this.socket.on("friendRequestAccepted", ({userId, userId2}: {userId: number, userId2: number}) => {
      if (this.me.id === userId || this.me.id === userId2) {
        this.getPendingRequestList();
      }
    });

    this.socket.on("friendRequestDeclined",({userId, userId2}: {userId: number, userId2: number}) => {
        if (this.me.id === userId || this.me.id === userId2) {
          this.getPendingRequestList();
        }
    });

    this.socket.on("userUnblocked",({userId, userId2}: {userId: number, userId2: number}) => {
      if (this.me.id === userId || this.me.id === userId2) {
        this.getBlockedUserList();
      };
    });

    this.socket.on("userBlocked",({userId, userId2}: {userId: number, userId2: number}) => {
      if (this.me.id === userId || this.me.id === userId2) {
        this.getBlockedUserList();
      }
    });
  }

ngOnChanges(changes: SimpleChanges): void {
  if ('this.friendsList' in changes) {
    this.getFriendList();
  }
  if ('pendingList' in changes) {
    this.getPendingRequestList();
  }
  if ('this.blockedList' in changes) {
    this.getBlockedUserList();
  }
}

  getMeUser(){
    this.usersService.getUserById(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.me = user;
      });
  }

  getFriendList() {
    this.friendService.getFriends(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((friends) => {
        this.friendsList = friends.users || [];
      });
  }

  getPendingRequestList() {
    this.friendService.getPendingFriendRequests(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pending) => {
        this.pendingList = pending.users || [];
      });
  }

  getBlockedUserList() {
    this.blockedUsersService.getBlockedUsers(this.userId)
    .pipe(takeUntil(this.destroy$))
    .subscribe((blocked) => {
      this.blockedList = blocked.users || [];
    });
  }

  inviteToPlay(){
    //game invitation
  }

  blockUser(blockee: User) {
    this.blockedUsersService.blockUser(new Users([this.me, blockee]));
  }

  unBlock(blocked: User) {
    this.socket.emit("unBlockUser", {meUser:this.me, unBlokee: blocked});
  }

  acceptFriendRequest(newFriend: User) {
    this.socket.emit("acceptFriendRequest", {newFriend: newFriend, meUser: this.me});
  }
  
  declineFriendRequest(notFriend: User) {
    this.socket.emit("declineFriendRequest", {notFriend: notFriend, meUser: this.me});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Online':
        return '#692a71';
      case 'Offline':
        return 'red';
      case 'Playing':
        return 'purple';
      default:
        return 'var(--color-dark blue)';
    }
  }

  openFriendProfile(user: User) {
    this.sharedDataService.setData(user.id!);
   
    this.sharedDataService.getData$().subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['profile']);
  }

}