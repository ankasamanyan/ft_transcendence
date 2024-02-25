import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarStatus } from "../domain/navigation-bar";
import { SharedDataService } from '../service/shared-data.service';
import { UsersService } from '../service/users.service';
import { User } from '../domain/user';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit{
  @Input()
  navigationStatus: NavigationBarStatus | undefined;

  showExitModal: boolean = false;

  meUserId!: number;

  user!: User;

  constructor (private sharedDataService: SharedDataService,
                private usersService: UsersService, ){}

  isGameSelected() {
    return this.navigationStatus == NavigationBarStatus.GAME;
  }

  isChatSelected() {
    return this.navigationStatus == NavigationBarStatus.CHAT;
  }

  isLogoutSelected() {
    return this.navigationStatus == NavigationBarStatus.LOGOUT;
  }

  ngOnInit(): void {

    this.sharedDataService.getMyUserId$()
      .subscribe((meUserId) => {
        this.meUserId = meUserId;
      })
    
    this.usersService.getUserById(this.meUserId)
      .subscribe((user) => {
          this.user = user;
      });
  }

  openMyProfile() {
    this.sharedDataService.setData(this.meUserId);
  }
}
