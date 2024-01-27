import { Component } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`]
})
export class FriendsComponent {
  // Sample friends data (replace with your actual data)
  friendsList = [
    { name: 'Friend 1', /* other details */ },
    { name: 'Friend 2', /* other details */ },
    // Add more friends as needed
  ];
}