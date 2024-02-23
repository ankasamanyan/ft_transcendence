import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarStatus } from '../domain/navigation-bar';
import { OurSocket } from '../socket/socket';
import { SharedDataService } from '../service/shared-data.service';
import { ElementRef, ViewChild } from '@angular/core';

class GameResponsetDto {
  constructor(
    public gameId:number,
    public paddleLeft:number,
    public paddleRight:number,
    public ballPos: [number, number],
  ){}
}

class GameStartResponseDto {
  constructor(
    public gameId:number,
    public player1:number,
    public player2:number,
  ){}
}

class GameScoreUpdateDto {
	constructor(
	  public gameId:number,
	  public player1Score:number,
	  public player2Score:number,
	){}
  }

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  userId!: number ;
  gameId: number = 1;
  paddleMoveSize: number = 10;
  constructor(private socket: OurSocket, private sharedDataService: SharedDataService){}

  NavigationBarStatus = NavigationBarStatus;
  gameState = 'play';

  // constants   if these change you have to change them in the backend too!!!
  paddleOffset: number = 10;
	paddleWidth: number = 2;
	ballRadius: number = 3;
	paddleHeight: number = 36 / 2;
  
  // Paddle positions
  // paddle1Top = 'calc(7.5vh + 55px)';
  // paddle1Left = 'calc(10vw + 30px)';
  // paddle2Top = 'calc(85vh + 7.5vh - 100px - 55px)';
  // paddle2Right = 'calc(10vw + 30px)';

  paddle1Top: number = 50;
  paddle2Top: number = 50;

  paddle1Left: number = 50;
  paddle2Right: number = 50;

  // Ball position
  ballTop = 'calc(50% - 15px)';
  ballLeft = 'calc(50% - 15px)';

  ballPosition: [number, number] = [0, 0];

  // Scores
  score1 = 0;
  score2 = 0;
  @ViewChild('ballRef') ballRef!: ElementRef;
  @ViewChild('paddle1Ref') paddle1Ref!: ElementRef;
  @ViewChild('paddle2Ref') paddle2Ref!: ElementRef;

  // Game message
  gameMessage = 'Press Enter to Play Pong';
  
  ngOnInit(): void {


    this.sharedDataService.getData$()
      .subscribe((userId) => {
        this.userId = userId;
      });
      this.socket.on("GameUpdate", (gameResponsetDto: GameResponsetDto) => {
        // console.log(gameResponsetDto);
        this.ballPosition = gameResponsetDto.ballPos;
        this.paddle1Top = gameResponsetDto.paddleLeft;
        this.paddle2Top = gameResponsetDto.paddleRight;
        // console.log("new ballPosition: " + this.ballPosition);
        const ballElement: HTMLElement = this.ballRef.nativeElement;
        const paddle1Element: HTMLElement = this.paddle1Ref.nativeElement;
        const paddle2Element: HTMLElement = this.paddle2Ref.nativeElement;
        ballElement.style.top = (this.ballPosition[0] - this.ballRadius) + '%';
        ballElement.style.left = (this.ballPosition[1] - this.ballRadius) + '%';
        paddle1Element.style.top = (this.paddle1Top - (this.paddleHeight / 2)) + '%';
        paddle2Element.style.top = (this.paddle2Top - (this.paddleHeight / 2)) + '%';
        paddle1Element.style.left= (this.paddleOffset - this.paddleWidth / 2) + '%';
        paddle2Element.style.right = (this.paddleOffset - this.paddleWidth / 2) + '%';
        paddle1Element.style.width = this.paddleWidth + '%';
        paddle1Element.style.height = this.paddleHeight + '%';
        paddle2Element.style.width = this.paddleWidth + '%';
        paddle2Element.style.height = this.paddleHeight + '%';
      });
      this.socket.on("gameStarted", (gameStartResponseDto: GameStartResponseDto) => {
        console.log(gameStartResponseDto);
        this.gameId = gameStartResponseDto.gameId;
        this.score1 = 0;
        this.score2 = 0;
        const ballElement: HTMLElement = this.ballRef.nativeElement;
        ballElement.style.height = this.ballRadius + '%';
        ballElement.style.width = this.ballRadius + '%';
      });
      this.socket.on("ScoreUpdate", (gameScoreUpdateDto: GameScoreUpdateDto) => {
        console.log(gameScoreUpdateDto);
        console.log("got a new score update");
        console.log("this is game id" + this.gameId);
        
        if (this.gameId === gameScoreUpdateDto.gameId)
        {
          this.score1 = gameScoreUpdateDto.player1Score;
          this.score2 = gameScoreUpdateDto.player2Score;
        }
        console.log(this.score1 + this.score2);
      });
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.gameState === 'play') {
      if (e.key === 'ArrowUp') {
        this.socket.emit("paddleUpdate", this.gameId, this.userId, this.paddleMoveSize * -1);
        console.log("pressed arrow up");
      } else if (e.key === 'ArrowDown') {
        this.socket.emit("paddleUpdate", this.gameId, this.userId, this.paddleMoveSize);
        console.log("pressed arrow down");
      } else if (e.key === 'ArrowLeft') {
      this.socket.emit("startGame", {user1: 1, user2: 2});
      console.log("pressed arrow left");
    }
  }
    if (e.key === 'Enter') {
      this.gameState = this.gameState === 'start' ? 'play' : 'start';
      if (this.gameState === 'play') {
        this.gameMessage = 'Game Started';
      } else {
        this.gameMessage = 'Press Enter to Play Pong';
      }
    }
  }
}
