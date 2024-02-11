import {Component, Inject} from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from './settings/settings.component';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})


  export class MyProfileComponent implements OnInit{

  public name: string = 'Anait';

  public username: string = '@akasaman';

  public selectedMenuItem: string = 'friends';

  public profilePicture: any =  "../../../assets/placeholderAvatar.jpeg";

  
  constructor() {}
  
  ngOnInit(): void {
  }

  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }
}
