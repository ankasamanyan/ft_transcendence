import { Injectable } from '@nestjs/common';
import { Users } from "../domain/user";
import { from } from "rxjs";
import { PrismaGameInvitationRepository } from 'src/adapter/repository/prisma-game-invitation-repository';
import { PrismaService } from './prisma.service';
import { Server } from 'socket.io';
import { PrismaGameRepository } from 'src/adapter/repository/prisma-game-repository';

class GameRequestDto {
    constructor(
      public gameId:number,
      public userId:number,
      public paddleMove:number,
    ){}
  }

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

  enum GameStatus {
	INIT,
	RUNNING,
	ENDED
}

enum GameEvent {
	SCORE1,
	SCORE2,
	PADDLECOLLISION,
	NOTHING,
}

export class GameData {
	server: Server;
	player1: number
	player2: number
	gameId: number

	// constants     if any of these change you have to change them in the frontend too!!!
	windowWidth: number = 100;
	windowHeight: number = 100;
	ballRadius: number = 3;
	paddleOffset: number = 10;
	paddleWidth: number = 2;
	paddleHeight: number = 36 / 2;
	winscore: number = 3;

	ScorePlayer1: number = 0;
	ScorePlayer2: number = 0;
	PositionPaddle1: number = 50 - this.paddleHeight;
	PositionPaddle2: number = 50 - this.paddleHeight;
	PositionBall: [number, number] = [50, 50];
	VelocityBall: [number, number] = this.initializeRandomVelocity();
	gameStatus: GameStatus = GameStatus.INIT;

	interval: NodeJS.Timer;

	constructor(userId1: number, userId2: number, gameID: number) {
		this.player1 = userId1;
		this.player2 = userId2;
		this.gameId = gameID;
	}

	initializeRandomVelocity(): [number, number] {
		// Generate random angle
		const velo: number = 1.5;
		const angle = Math.random() * Math.PI * 2; // Random angle in radians

		// Calculate vx and vy based on the angle
		const vx = Math.cos(angle) * velo;
		const vy = Math.sin(angle) * velo;

		return [vx, vy];

		// return [-1, +0.5]
	}

	checkPaddleCollision(nextBallX: number, nextBallY: number): Boolean {
		const paddle1Left = this.paddleOffset - this.paddleWidth / 2;
		const paddle1Right = this.paddleOffset + this.paddleWidth / 2;
		const paddle1Top = this.PositionPaddle1 - this.paddleHeight / 2;
		const paddle1Bottom = this.PositionPaddle1 + this.paddleHeight / 2;
		const paddle2Left = (100 - this.paddleOffset) - this.paddleWidth / 2;
		const paddle2Right = (100 - this.paddleOffset) + this.paddleWidth / 2;
		const paddle2Top = this.PositionPaddle2 - this.paddleHeight / 2;
		const paddle2Bottom = this.PositionPaddle2 + this.paddleHeight / 2;

		if (
			nextBallX - this.ballRadius <= paddle1Right && // Check if ball's right side is beyond paddle's left side
			((nextBallY - this.ballRadius>= paddle1Top && nextBallY - this.ballRadius <= paddle1Bottom) ||
			(nextBallY + this.ballRadius >= paddle1Top && nextBallY + this.ballRadius<= paddle1Bottom))
		) {
			return true;
		} // paddle 1 coll
		if (
			nextBallX + this.ballRadius >= paddle2Left && // Check if ball's left side is beyond paddle's right side
			((nextBallY - this.ballRadius>= paddle2Top && nextBallY - this.ballRadius <= paddle2Bottom) ||
			(nextBallY + this.ballRadius >= paddle2Top && nextBallY + this.ballRadius<= paddle2Bottom))
		) {
			return true;
		} // paddle 2 coll
		return false
	}

	checkEvent(): GameEvent {
		const [ballX, ballY] = this.PositionBall;
		const [ballVx, ballVy] = this.VelocityBall;
	
		const nextBallX = ballX + ballVx;
		const nextBallY = ballY + ballVy;
		if (nextBallX - this.ballRadius <= 0) {
				return GameEvent.SCORE2;
		}
		if (nextBallX + this.ballRadius >= this.windowWidth) {
				return GameEvent.SCORE1;
		}
		if (this.checkPaddleCollision(nextBallX, nextBallY) === true) {
			console.log("paddlecollision")
			return GameEvent.PADDLECOLLISION;
		}
		return GameEvent.NOTHING;
	}
	updateBallPosition() {
		if (this.PositionBall[1] - this.ballRadius <= 0 || this.PositionBall[1] + this.ballRadius >= this.windowHeight) {
			// Reverse the y component of velocity to simulate bouncing off the top or bottom wall
			this.VelocityBall[1] *= -1;
		}
		this.PositionBall[0] = this.PositionBall[0] + this.VelocityBall[0];
		this.PositionBall[1] = this.PositionBall[1] + this.VelocityBall[1];
		// Check for collision with top and bottom walls
	}
	scoreUpdate(scoringPlayer: number) {
		if (scoringPlayer === GameEvent.SCORE1) {
			this.ScorePlayer1 = this.ScorePlayer1 + 1;
		}
		if (scoringPlayer === GameEvent.SCORE2) {
			this.ScorePlayer2 = this.ScorePlayer2 + 1;
		}
		this.server.emit('ScoreUpdate', new GameScoreUpdateDto(this.gameId, this.ScorePlayer1, this.ScorePlayer2));
	}
	resetAfterScore() {
		console.log("resetAfterScore")
		this.PositionPaddle1 = 50
		this.PositionPaddle2 = 50
		this.PositionBall = [50, 50];
		this.VelocityBall = this.initializeRandomVelocity();
	}
	handlePaddleCollision() {
		// problem it alwas thinks it will collide top or bottom if its past its middle facing boundry


		if (this.PositionBall[0] < 50) {
			if (this.PositionBall[0] - this.ballRadius > this.paddleOffset + (this.paddleWidth / 2)) {
				this.VelocityBall[0] *= -1;
			} // revert x if frontal collition
			if (this.PositionBall[0] + this.ballRadius > this.paddleOffset - (this.paddleWidth / 2)) {
				if (this.PositionBall[1] - this.ballRadius > this.PositionPaddle1 + (this.paddleHeight / 2)) {
					this.VelocityBall[1] *= -1;
				} // is bellow the paddle
				if (this.PositionBall[1] + this.ballRadius < this.PositionPaddle1 - (this.paddleHeight / 2)) {
					this.VelocityBall[1] *= -1;
				} // is above the paddle
			}
		} // left paddle coll
		else {
			if (this.PositionBall[0] + this.ballRadius < 100 - (this.paddleOffset + (this.paddleWidth / 2))) {
				this.VelocityBall[0] *= -1;
			} // revert x if frontal collition
			if (this.PositionBall[0] - this.ballRadius < 100 - (this.paddleOffset - (this.paddleWidth / 2))) {
				if (this.PositionBall[1] - this.ballRadius > this.PositionPaddle2 + (this.paddleHeight / 2)) {
					this.VelocityBall[1] *= -1;
				} // is bellow the paddle
				if (this.PositionBall[1] + this.ballRadius < this.PositionPaddle2 - (this.paddleHeight / 2)) {
					this.VelocityBall[1] *= -1;
				} // is above the paddle
			}
		} // right paddle coll
	}

	async gameLoop() {
		console.log("inside gameLoop function with ballCoord: " + this.PositionBall + " " + this.VelocityBall);
		// console.log(this.PositionPaddle1 + " " + this.PositionPaddle2);
		const scoreCase = this.checkEvent();
		// console.log("scoreCase: " + scoreCase);
		if (scoreCase === GameEvent.SCORE2 || scoreCase === GameEvent.SCORE1) {
			this.scoreUpdate(scoreCase);
			if (this.ScorePlayer1 === this.winscore || this.ScorePlayer2 === this.winscore) {
				this.gameStatus = GameStatus.ENDED;
				return ;
			}
			this.resetAfterScore();
		}
		if (scoreCase === GameEvent.NOTHING) {
			this.updateBallPosition();
		}
		if (scoreCase === GameEvent.PADDLECOLLISION) {
			this.handlePaddleCollision();
		}
		this.server.emit('GameUpdate', new GameResponsetDto(this.gameId, this.PositionPaddle1, this.PositionPaddle2, this.PositionBall));
		// have to emit new positionsfor both users here
		if (scoreCase === GameEvent.SCORE2 || scoreCase === GameEvent.SCORE1) {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}

	updatePaddle(userId: number, paddleMove: number) {
		console.log("updatePaddleCalled ")
		if (userId === this.player1) {
			console.log("player1")
			if (!(paddleMove + this.PositionPaddle1 - (this.paddleHeight / 2) < 0 || paddleMove + this.PositionPaddle1 + (this.paddleHeight / 2) > this.windowHeight)) {
				this.PositionPaddle1 = paddleMove + this.PositionPaddle1;
			}
		}
		else if (userId === this.player2) {
			console.log("player2")
			if (!(paddleMove + this.PositionPaddle2 - (this.paddleHeight / 2) < 0 || paddleMove + this.PositionPaddle2 + (this.paddleHeight / 2) > this.windowHeight)) {
				this.PositionPaddle2 = paddleMove + this.PositionPaddle2;
			}
		}
	};

	gameState(): GameResponsetDto {
		return new GameResponsetDto(this.gameId, this.PositionPaddle1, this.PositionPaddle2, this.PositionBall);
	};


	async startGame(_server: Server) {
		this.server = _server;
		this.server.emit("gameStarted", new GameStartResponseDto(this.gameId, this.player1, this.player2));
		await new Promise(resolve => setTimeout(resolve, 1000));
		while(this.gameStatus !== GameStatus.ENDED)
		{
			await new Promise(resolve => setTimeout(resolve, 25));
			await this.gameLoop();
		}
		console.log("game Ended");
	};
}

@Injectable()
export class GameService {
	constructor(private prismaGameInvitationRepository: PrismaGameInvitationRepository,
		private prismaGameInventory: PrismaGameRepository,
		private prisma: PrismaService) {}

	gameList: GameData[] = [];

	invite(users: Users) {
		return from(this.prismaGameInvitationRepository.invite(users));
	}

	deleteOrDecline(invitationId: number) {
		return from(this.prismaGameInvitationRepository.deleteOrDecline(invitationId));
	}

	getInvitations(userId: number) {
		return from(this.prismaGameInvitationRepository.getInvitations(userId));
	}

	getFutureMatches(userId: number) {
		return from(this.prismaGameInvitationRepository.getFutureMatches(userId));
	}

	accept(invitationId: number) {
		return from(this.prismaGameInvitationRepository.accept(invitationId));
	}

	getAllFutureMatches() {
		return from(this.prismaGameInvitationRepository.getAllFutureMatches());
	}

	getNextMatch() {
		return from(this.prismaGameInvitationRepository.getNextMatch());
	}

	async updatePaddle(gameRequestDto: GameRequestDto): Promise<GameResponsetDto | undefined> {
		let gameIndex = this.findGameIndex(gameRequestDto.gameId);
		// console.log("updatePaddle mit index: " + gameIndex + " user" + gameRequestDto.gameId)
		if (gameIndex != -1) {
			this.gameList[gameIndex].updatePaddle(gameRequestDto.userId, gameRequestDto.paddleMove);
			return this.gameList[gameIndex].gameState();
		}
		return undefined;
    }


	async gameFinished(gameIdToRemove: number) {
		const indexToRemove = this.gameList.findIndex((game) => {
			console.log(game.gameId + " " + gameIdToRemove)
			return game.gameId === gameIdToRemove;
		});
		console.log("game finished id: " + gameIdToRemove + " with index " + indexToRemove)
		if (indexToRemove !== -1) {
			this.prismaGameInventory.gameOver( this.gameList[indexToRemove].gameId,
				Number(this.gameList[indexToRemove].ScorePlayer1),
				Number(this.gameList[indexToRemove].ScorePlayer2))
			this.gameList.splice(indexToRemove, 1);
		}
	}

	async startGame(player1: number, player2: number, server: Server) {
		const datbaseGameObj = await this.prisma.game.create({
			data: {
                player1: Number(player1),
                player2: Number(player2),
            }
		});
		const gameToStart = new GameData(player1, player2, datbaseGameObj.id);
		this.gameList.push(gameToStart);
		await gameToStart.startGame(server);
		this.gameFinished(gameToStart.gameId);
	}

	findGameIndex(gameIdToFind: number): number{
		return this.gameList.findIndex((game) => {
			game.gameId === gameIdToFind;
		});
	}
}
