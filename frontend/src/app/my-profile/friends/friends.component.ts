import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: `./friends.component.html`,
  styleUrls: [`./friends.component.css`],

})
export class FriendsComponent implements OnInit {
  public friendsList: any[] = [];
  public placeHolderMessage: string = 'List is currently empty...'

  ngOnInit(): void {
    this.friendsList = [
      { 
        name: 'Cedric Erdelen', 
        profilePicture: '../../../../src/assets/placeholderComrade2.jpeg',
        username: '@cerdelen',

      },
      { 
        name: 'Tetiana Fedorenko',
        profilePicture: '../../../../src/assets/placeholderComrade.jpeg',
        username: '@tfedoren',
      },
      { 
        name: 'Kristiyana Milcheva',
        profilePicture: '../../../../src/assets/placeholderComrade1.jpeg',
        username: '@kmilchev',
      },
    ];
  }

  sendDirectMessage() {

  }

  sendGameRequest() {
    
  }
}