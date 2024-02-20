import { Component, Input, OnInit } from '@angular/core';
import { NavigationBarStatus } from '../domain/navigation-bar';
import { OurSocket } from '../socket/socket';
import { SharedDataService } from '../service/shared-data.service';

class GameResponsetDto {
  constructor(
    public gameId:number,
    public paddleLeft:number,
    public paddleRight:number,
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
  
  // Paddle positions
  paddle1Top = 'calc(7.5vh + 55px)';
  paddle1Left = 'calc(10vw + 30px)';
  paddle2Top = 'calc(85vh + 7.5vh - 100px - 55px)';
  paddle2Right = 'calc(10vw + 30px)';

  // Ball position
  ballTop = 'calc(50% - 15px)';
  ballLeft = 'calc(50% - 15px)';

  // Scores
  score1 = 0;
  score2 = 0;

  // Game message
  gameMessage = 'Press Enter to Play Pong';

  ngOnInit(): void {
    this.sharedDataService.getData$()
      .subscribe((userId) => {
        this.userId = userId;
      });
      this.socket.on("GameUpdate", (gameResponsetDto: GameResponsetDto) => {
        console.log(gameResponsetDto);
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
        this.resetGame();
        this.moveBall();
      } else {
        this.gameMessage = 'Press Enter to Play Pong';
      }
    }
  }

    // Handle other key events if needed

  private moveBall(): void {
    // Your moveBall logic here
    // Update ballTop and ballLeft based on your game logic
    // Use requestAnimationFrame for smooth animations
  }

  private resetGame(): void {
    // Your resetGame logic here
    // Reset paddles, ball, and scores
  }

  private updatePaddle1Position(direction: 'up' | 'down'): void {
    // Your updatePaddle1Position logic here
    // Update paddle1Top based on the direction
  }

  private checkCollisions(): void {
    // Your checkCollisions logic here
    // Check for collisions with paddles and walls
  }
}
