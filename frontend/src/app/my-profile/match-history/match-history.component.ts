import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {
  public placeHolderMessage: string = "You will see something here, once you start playing << THE PONG >> 🎯✨";
  public historyList:any[] = [];

  ngOnInit(): void {
    this.historyList = [
      { 
        name: 'Anait', 
        profilePicture: '../../../assets/placeholderAvatar.jpeg',
        username: '@akasaman',
        myMatchResult: '3',
        opponentMatchResult: '2',
        opponentName: 'Cedric',
        opponentUsername: '@cerdelen',
        opponentProfilePicture: '../../../assets/placeholderComrade2.jpeg',
      },
      { 
        name: 'Anait', 
        profilePicture: '../../../assets/placeholderAvatar.jpeg',
        username: '@akasaman',
        myMatchResult: '1',
        opponentMatchResult: '3',
        opponentName: 'Tetiana',
        opponentUsername: '@tfedoren',
        opponentProfilePicture: '../../../assets/placeholderComrade.jpeg',
      },
      { 
        name: 'Anait', 
        profilePicture: '../../../assets/placeholderAvatar.jpeg',
        username: '@akasaman',
        myMatchResult: '2',
        opponentMatchResult: '2',
        opponentName: 'Kristiyana',
        opponentUsername: '@kmilchev',
        opponentProfilePicture: '../../../assets/placeholderComrade3.jpeg',
      },
    ];
  }

}
