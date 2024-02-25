import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarStatus } from '../domain/navigation-bar';
import { OurSocket } from '../socket/socket';
import { SharedDataService } from '../service/shared-data.service';
import { ElementRef, ViewChild } from '@angular/core';
import { GameOverDto, BallUpdateDto, GameScoreUpdateDto, GameStartResponseDto, PaddleUpdateDto, PaddleUpdateResponseDto } from '../service/dto/game.dto';
import { HttpClient } from "@angular/common/http";



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  userId!: number ;
  gameId: number = 1;
  paddleMoveSize: number = 5;
  constructor(private socket: OurSocket, private sharedDataService: SharedDataService,
    private httpClient: HttpClient){}

  NavigationBarStatus = NavigationBarStatus;

  gameState = 'play';

  // constants   if these change you have to change them in the backend too!!!
  paddleOffset: number = 10;
  paddleWidth: number = 2;
  ballRadius: number = 2;
  paddleHeight: number = 36 / 2;

  paddle1Top: number = 0;
  paddle2Top: number = 0;

  paddle1Left: number = 50;
  paddle2Right: number = 50;

  ballPosition: [number, number] = [0, 0];

  // Scores
  score1 = 0;
  score2 = 0;
  @ViewChild('ballRef') ballRef!: ElementRef;
  @ViewChild('paddle1Ref') paddle1Ref!: ElementRef;
  @ViewChild('paddle2Ref') paddle2Ref!: ElementRef;

  // Game message
  gameMessage = 'Press Enter to Play Pong';

  isGameOn: boolean = false;

  ngOnInit(): void {
    this.sharedDataService.getMyUserId$()
        .subscribe((userId) => {
          this.userId = userId;
        });
    this.socket.on("GameUpdate", (BallUpdateDto: BallUpdateDto) => {
      this.ballPosition = BallUpdateDto.ballPos;
      const ballElement: HTMLElement = this.ballRef.nativeElement;
      ballElement.style.top = (this.ballPosition[1] - this.ballRadius) + '%';
      ballElement.style.left = (this.ballPosition[0] - this.ballRadius) + '%';
      console.log("BallUpdate: " + this.ballPosition);
    });

    this.socket.on("paddleUpdate", (paddleUpdate: PaddleUpdateResponseDto) => {
      if (this.gameId === paddleUpdate.gameId) {
        this.renderPaddles(paddleUpdate.paddleLeft, paddleUpdate.paddleRight);
      }

    });

    this.socket.on("gameOver", (gameOverDto: GameOverDto) => {
      if (gameOverDto.gameId === this.gameId) {
        if (gameOverDto.winnerId === this.userId) {
          this.gameMessage = "You Won!"
        }
        else {
          this.gameMessage = "You lost!"
        }
      }
    })

    this.socket.on("gameStarted", (gameStartResponseDto: GameStartResponseDto) => {
      this.gameId = gameStartResponseDto.gameId;
      this.score1 = 0;
      this.score2 = 0;
      const ballElement: HTMLElement = this.ballRef.nativeElement;
      ballElement.style.height = this.ballRadius + '%';
      ballElement.style.width = this.ballRadius + '%';
      this.renderPaddles(50, 50);
    });
    this.socket.on("ScoreUpdate", (gameScoreUpdateDto: GameScoreUpdateDto) => {
      if (this.gameId === gameScoreUpdateDto.gameId)
      {
        this.score1 = gameScoreUpdateDto.player1Score;
        this.score2 = gameScoreUpdateDto.player2Score;
      }
    });
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  renderPaddles(paddleLeft: number, paddleRight: number) {
    if (this.paddle1Top !== paddleLeft){
      const paddle1Element: HTMLElement = this.paddle1Ref.nativeElement;
      this.paddle1Top = paddleLeft;
      paddle1Element.style.top = (this.paddle1Top - (this.paddleHeight / 2)) + '%';
      paddle1Element.style.left= (this.paddleOffset - this.paddleWidth / 2) + '%';
      paddle1Element.style.width = this.paddleWidth + '%';
      paddle1Element.style.height = this.paddleHeight + '%';
    }
    if (this.paddle2Top !== paddleRight){
      const paddle2Element: HTMLElement = this.paddle2Ref.nativeElement;
      this.paddle2Top = paddleRight;
      paddle2Element.style.top = (this.paddle2Top - (this.paddleHeight / 2)) + '%';
      paddle2Element.style.right = (this.paddleOffset - this.paddleWidth / 2) + '%';
      paddle2Element.style.width = this.paddleWidth + '%';
      paddle2Element.style.height = this.paddleHeight + '%';
    }
  }

  private handleKeyDown(e: KeyboardEvent):void {
    if (e.key === 'ArrowRight') {
    this.httpClient.get<string>("http://localhost:3000/users/getStatus/"+ 98455)
    .subscribe((data: string) => {
    });
  }
    if (this.gameState === 'play') {
      if (e.key === 'ArrowUp') {
        this.socket.emit("paddleUpdate", {gameId: this.gameId, userId: this.userId, paddleMove: this.paddleMoveSize * -1} as PaddleUpdateDto);
      } else if (e.key === 'ArrowDown') {
        this.socket.emit("paddleUpdate", {gameId: this.gameId, userId: this.userId, paddleMove: this.paddleMoveSize} as PaddleUpdateDto);
      } else if (e.key === 'ArrowLeft') {
        const my_id = this.sharedDataService.getMyUserId$().subscribe();
        this.socket.emit("startGame", {user1: this.userId, user2: 98629});
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
