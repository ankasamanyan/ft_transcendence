import { Component, Input, OnInit } from '@angular/core';
import { MatchHistoryDto } from 'src/app/service/dto/game.dto';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  constructor(
    private gameService: GameService,
  ){}

  @Input() userId!: number;
  
  public historyList:MatchHistoryDto[] = [];
  
  public placeHolderMessage: string = "You will see something here, once you start playing << THE PONG >> 🎯✨";


  ngOnInit(): void {
    this.gameService.getMatchHistory(this.userId)
      .subscribe(data => {
        this.historyList = data.history;
      });
  }

}
