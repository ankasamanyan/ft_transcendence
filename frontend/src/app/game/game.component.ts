import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarStatus } from '../domain/navigation-bar';
import { OurSocket } from '../socket/socket';
import { SharedDataService } from '../service/shared-data.service';
import { ElementRef, ViewChild } from '@angular/core';
import { gameReadyDto, GameOverDto, BallUpdateDto, GameScoreUpdateDto, GameStartResponseDto, PaddleUpdateDto, PaddleUpdateResponseDto } from '../service/dto/game.dto';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import { UsersService } from '../service/users.service';
import { User } from '../domain/user';

enum GameState {
  WAITING,
  READY,
  PLAYING,
  GAMEOVER
} // if change on this enum change html

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  userId!: number ;
  otherUser!: number ;
  gameId: number = 1;
  paddleMoveSize: number = 5;
  meUser!: User;
  opponentUser!: User;

  leftUser!: User;
  rightUser!: User;

  constructor(
      private socket: OurSocket,
      private sharedDataService: SharedDataService,
      private httpClient: HttpClient,
      private router: Router,
      private usersServices: UsersService) {}

  NavigationBarStatus = NavigationBarStatus;

  // gameState = 'play';

  // constants   if these change you have to change them in the backend too!!!
  paddleOffset: number = 10;
  paddleWidth: number = 2;
  ballRadius: number = 2;
  paddleHeight: number = 36 / 2;

  paddle1Top: number = 50;
  paddle2Top: number = 50;

  paddle1Left: number = 0;
  paddle2Right: number = 0;

  ballPosition: [number, number] = [50, 50];

  // Scores
  score1 = 0;
  score2 = 0;
  @ViewChild('ballRef') ballRef!: ElementRef;
  @ViewChild('paddle1Ref') paddle1Ref!: ElementRef;
  @ViewChild('paddle2Ref') paddle2Ref!: ElementRef;

  // Game message
  gameMessage = 'Press Enter to Play Pong';

  gameState: GameState = GameState.WAITING;

  ngOnInit(): void {
    this.sharedDataService.getMyUserId$()
        .subscribe((userId) => {
          this.userId = userId;
          this.usersServices.getUserById(userId)
          .subscribe(meUserData => {this.meUser = meUserData;})
        });
    this.socket.on("gameReady", (gameReadyData: gameReadyDto) => {
      if (gameReadyData.beenInvitedId === this.userId || gameReadyData.invitedId === this.userId) {
        this.gameState = GameState.READY;
        if (gameReadyData.invitedId === this.userId) {
          this.otherUser = gameReadyData.beenInvitedId;
        }
        else {
          this.otherUser = gameReadyData.invitedId;
        }
        this.usersServices.getUserById(this.otherUser)
          .subscribe(opponentUserData => {
            this.opponentUser = opponentUserData;
            if (this.meUser.id === gameReadyData.beenInvitedId) {
              this.leftUser = this.meUser;
              this.rightUser = this.opponentUser;
            } else {
              this.rightUser = this.meUser;
              this.leftUser = this.opponentUser;
            }
          })
      }
    });
  
    this.socket.on("invitationAccepted",({invitedId, beenInvitedId}: { invitedId: number, beenInvitedId: number }) => {
      if (beenInvitedId === this.userId || invitedId === this.userId) {
        this.gameState = GameState.READY;
        if (invitedId === this.userId) {
          this.otherUser = beenInvitedId;
        }
        else {
          this.otherUser = invitedId;
        }
      }
    });

    this.socket.on("GameUpdate", (ballUpdateDto: BallUpdateDto) => {
      if (this.gameId === ballUpdateDto.gameId) {
        this.ballPosition = ballUpdateDto.ballPos;
        const ballElement: HTMLElement = this.ballRef.nativeElement;
        ballElement.style.top = (this.ballPosition[1] - this.ballRadius) + '%';
        ballElement.style.left = (this.ballPosition[0] - this.ballRadius) + '%';
        console.log("BallUpdate: " + this.ballPosition);
      }
    });

    this.socket.on("paddleUpdate", (paddleUpdate: PaddleUpdateResponseDto) => {
      console.log("PaddleUpdate socket received")
      if (this.gameId === paddleUpdate.gameId) {
      console.log("PaddleUpdate socket accepted")
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
        this.gameState = GameState.GAMEOVER;
      }
    })

    this.socket.on("gameStarted", (gameStartResponseDto: GameStartResponseDto) => {
        console.log("gameStarted received")
        if (gameStartResponseDto.player1 !== this.userId && gameStartResponseDto.player2 !== this.userId) {
        console.log("gameStart but user is wrong so i have the return")
        return ;
      }
      this.gameMessage = ""
      this.gameState = GameState.PLAYING;
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

  leaveGame() {
    if (this.gameState === GameState.GAMEOVER) {
      this.gameMessage = 'Press Enter to Play Pong';
      this.score1 = 0;
      this.score2 = 0;
      this.gameState = GameState.WAITING;
      this.paddle1Top = 50;
      this.paddle2Top = 50;
      this.ballPosition = [50,50];
    }
  }

  renderPaddles(paddleLeft: number, paddleRight: number) {
      console.log("renderPaddles function")
      // if (this.paddle1Top !== paddleLeft){
      console.log("renderPaddles paddle1")
      const paddle1Element: HTMLElement = this.paddle1Ref.nativeElement;
      this.paddle1Top = paddleLeft;
      paddle1Element.style.top = (this.paddle1Top - (this.paddleHeight / 2)) + '%';
      paddle1Element.style.left= (this.paddleOffset - this.paddleWidth / 2) + '%';
      paddle1Element.style.width = this.paddleWidth + '%';
      paddle1Element.style.height = this.paddleHeight + '%';
    // }
    // if (this.paddle2Top !== paddleRight){
      console.log("renderPaddles paddle2")
      const paddle2Element: HTMLElement = this.paddle2Ref.nativeElement;
      this.paddle2Top = paddleRight;
      paddle2Element.style.top = (this.paddle2Top - (this.paddleHeight / 2)) + '%';
      paddle2Element.style.right = (this.paddleOffset - this.paddleWidth / 2) + '%';
      paddle2Element.style.width = this.paddleWidth + '%';
      paddle2Element.style.height = this.paddleHeight + '%';
    // }
  }

  private handleKeyDown(e: KeyboardEvent):void {
    if (e.key === 'ArrowRight') {
    this.httpClient.get<string>("http://localhost:3000/users/getStatus/"+ 98455)
    .subscribe((data: string) => {
    });
  }
    if (this.gameState !== GameState.WAITING) {
      const my_id = this.sharedDataService.getMyUserId$().subscribe();
      if (e.key === 'ArrowUp') {
        this.socket.emit("paddleUpdate", {gameId: this.gameId, userId: this.userId, paddleMove: this.paddleMoveSize * -1} as PaddleUpdateDto);
      } else if (e.key === 'ArrowDown') {
        this.socket.emit("paddleUpdate", {gameId: this.gameId, userId: this.userId, paddleMove: this.paddleMoveSize} as PaddleUpdateDto);
      }
      else if (e.key === 'Enter') {
        if (this.gameState === GameState.READY) {
          this.socket.emit("startGame", {user1: this.userId, user2: this.otherUser});
        }
      }
    }
  }
}
