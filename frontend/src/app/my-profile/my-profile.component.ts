import { Component } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})


  export class MyProfileComponent implements OnInit{

  public name: string = 'Anait';
  public surname: string = 'Kasamanian';
  public username: string = '@akasaman';
  public selectedMenuItem: string = 'friends';
  
  
  ngOnInit(): void {
  }

  selectMenuItem(menuItem: string) {
    this.selectedMenuItem = menuItem;
  }
}
