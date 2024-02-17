import {Component, Inject} from '@angular/core';
import { OnInit } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { SharedDataService } from '../service/shared-data.service';
import { User } from '../domain/user';
import { UsersService } from '../service/users.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})


  export class MyProfileComponent implements OnInit{

  public user!: User;

  public userId!: number;
  
  public selectedMenuItem: string = 'friends';
  
  
  constructor(private sharedDataService: SharedDataService, private usersService: UsersService) {}
  
  ngOnInit(): void {

    this.sharedDataService.getData$()
      .subscribe((data) => {
        this.userId = data
      });
    console.log("this is the userId: " + this.userId);
      
    this.usersService.getUserById(this.userId)
      .subscribe((user) => {
        this.user = user;
      });
  }

  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }
}
