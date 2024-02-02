import { Component } from '@angular/core';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent {
  public placeHolderMessage: string = "You will see something here, once you start playing << THE PONG >> 🎯✨";
  public historyList:any[] = [];
}
