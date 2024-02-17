import {Component, Input, OnInit} from '@angular/core';
import {NavigationBarStatus} from "../domain/navigation-bar";
import { SharedDataService } from '../service/shared-data.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit{
  @Input()
  navigationStatus: NavigationBarStatus | undefined;

  showExitModal: boolean = false;

  constructor (private sharedDataService: SharedDataService){}

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
    
    const userId:number = 1;
    this.sharedDataService.setData(userId);
  }
}
