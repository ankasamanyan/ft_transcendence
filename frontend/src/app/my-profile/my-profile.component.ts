import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})

export class MyProfileComponent {
  public selectedMenuItem: string = 'Friends';
  public name: String = 'Anait';
  public surname: String = 'Kasamanian';
  public username: String = '@akasaman'

  selectMenuItem(menuItem: string): void {
    this.selectedMenuItem = menuItem;
  }
}
