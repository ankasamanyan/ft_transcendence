import { Injectable } from '@nestjs/common';
import { Users } from "../domain/user";
import { from } from "rxjs";
import { PrismaGameInvitationRepository } from 'src/adapter/repository/prisma-game-invitation-repository';
import { PrismaService } from './prisma.service';
import { Server } from 'socket.io';
import { PrismaGameRepository } from 'src/adapter/repository/prisma-game-repository';
import { gameReadyDto, GameOverDto, BallUpdateDto, GameScoreUpdateDto, GameStartResponseDto, PaddleUpdateDto, PaddleUpdateResponseDto } from 'src/adapter/dto/game.dto';

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
	ballRadius: number = 2;
	paddleOffset: number = 10;
	paddleWidth: number = 2;
	paddleHeight: number = 36 / 2;
	winscore: number = 3;

	ScorePlayer1: number = 0;
	ScorePlayer2: number = 0;
	PositionPaddle1: number = 50;
	PositionPaddle2: number = 50;
	PositionBall: [number, number] = [50, 50];
	VelocityBall: [number, number] = this.initializeRandomVelocity();
	gameStatus: GameStatus = GameStatus.INIT;

	constructor(userId1: number, userId2: number, gameID: number) {
		this.player1 = userId1;
		this.player2 = userId2;
		this.gameId = gameID;
	}

	initializeRandomVelocity(): [number, number] {
		const minVx: number = 0.35;
		const velo: number = 1.5;

		let angle = Math.random() * Math.PI * 2;
		let vx = Math.cos(angle) * velo;
		let vy = Math.sin(angle) * velo;

		while (Math.abs(vx) < minVx) {
			angle = Math.random() * Math.PI * 2;
			vx = Math.cos(angle) * velo;
			vy = Math.sin(angle) * velo;
		} // redo velocities in case x velocity is too small
		return [vx, vy];
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
		const dto: GameScoreUpdateDto = {
			gameId: this.gameId,
			player1Score: this.ScorePlayer1,
			player2Score: this.ScorePlayer2,
		}
		this.server.emit('ScoreUpdate', dto);
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
		const scoreCase = this.checkEvent();
		if (scoreCase === GameEvent.SCORE2 || scoreCase === GameEvent.SCORE1) {
			this.scoreUpdate(scoreCase);
			if (this.ScorePlayer1 === this.winscore || this.ScorePlayer2 === this.winscore) {
				this.gameStatus = GameStatus.ENDED;
				return ;
			}
			this.resetAfterScore();
			this.server.emit("paddleUpdate", {gameId: this.gameId, paddleLeft: this.PositionPaddle1, paddleRight: this.PositionPaddle2} as PaddleUpdateResponseDto);
		}
		if (scoreCase === GameEvent.NOTHING) {
			this.updateBallPosition();
		}
		if (scoreCase === GameEvent.PADDLECOLLISION) {
			this.handlePaddleCollision();
			this.updateBallPosition();
		}
		const dto: BallUpdateDto = {
			gameId: this.gameId,
			ballPos: this.PositionBall,
		}
		this.server.emit('GameUpdate', dto);
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
				if (this.checkPaddleCollision(this.PositionBall[0], this.PositionBall[1])){
					this.PositionPaddle1 = this.PositionPaddle1 - paddleMove;
				} // doesnt go "into" the ball, if so revert it
			} // doesnt go out of the window
		}
		else if (userId === this.player2) {
			console.log("player2")
			if (!(paddleMove + this.PositionPaddle2 - (this.paddleHeight / 2) < 0 || paddleMove + this.PositionPaddle2 + (this.paddleHeight / 2) > this.windowHeight)) {
				this.PositionPaddle2 = paddleMove + this.PositionPaddle2;
				if (this.checkPaddleCollision(this.PositionBall[0], this.PositionBall[1])){
					this.PositionPaddle2 = this.PositionPaddle2 - paddleMove;
				}
			}
		}
		this.server.emit("paddleUpdate", {gameId: this.gameId, paddleLeft: this.PositionPaddle1, paddleRight: this.PositionPaddle2} as PaddleUpdateResponseDto);
	};

	gameState(): BallUpdateDto {
		const dto:BallUpdateDto =  {
			gameId: this.gameId,
			ballPos: this.PositionBall,
		};
		return dto;
	};


	async startGame(_server: Server) {
		this.server = _server;
		const dto:GameStartResponseDto = {
			gameId: this.gameId,
			player1: this.player1,
			player2: this.player2,
		};
		this.server.emit("gameStarted", dto);
		await new Promise(resolve => setTimeout(resolve, 1000));
		while(this.gameStatus !== GameStatus.ENDED)
		{
			await new Promise(resolve => setTimeout(resolve, 35));
			await this.gameLoop();
		}
	};

	gameOver() {
		this.server.emit("gameOver", {
			gameId: this.gameId,
			winnerId: this.ScorePlayer1 < this.ScorePlayer2 ? this.player2 : this.player1,
			loserId:  this.ScorePlayer1 < this.ScorePlayer2 ? this.player1 : this.player2,
		} as GameOverDto );
	};
}

@Injectable()
export class GameService {
	constructor(private prismaGameInvitationRepository: PrismaGameInvitationRepository,
				private prismaGameInventory: PrismaGameRepository,
				private prisma: PrismaService
	) {}

	gameList: GameData[] = [];

	invite(users: Users) {
		return from(this.prismaGameInvitationRepository.invite(users));
	}

	deleteOrDecline(users: Users) {
		return from(this.prismaGameInvitationRepository.deleteOrDecline(users));
	}

	getInvitations(userId: number) {
		return from(this.prismaGameInvitationRepository.getInvitations(userId));
	}

	isInvitationAlreadySent(initiatorId: number, recipientId: number) {
		return from(this.prismaGameInvitationRepository.isInvitationAlreadySent(initiatorId, recipientId));
	}

	getFutureMatches(userId: number) {
		return from(this.prismaGameInvitationRepository.getFutureMatches(userId));
	}

	accept(users: Users) {
		return from(this.prismaGameInvitationRepository.deleteOrDecline(users));
	}

	getAllFutureMatches() {
		return from(this.prismaGameInvitationRepository.getAllFutureMatches());
	}

	getNextMatch() {
		return from(this.prismaGameInvitationRepository.getNextMatch());
	}

	async updatePaddle(paddleUpdateDto: PaddleUpdateDto): Promise<BallUpdateDto | undefined> {
		let gameIndex = this.findGameIndex(paddleUpdateDto.gameId);
		if (gameIndex != -1) {
			this.gameList[gameIndex].updatePaddle(paddleUpdateDto.userId, paddleUpdateDto.paddleMove);
			return this.gameList[gameIndex].gameState();
		}
		return undefined;
	}


	async gameFinished(gameIdToRemove: number) {
		const indexToRemove = this.gameList.findIndex((game) => {
			return game.gameId === gameIdToRemove;
		});
		console.log("game finished id: " + gameIdToRemove + " with index " + indexToRemove)
		if (indexToRemove !== -1) {
			this.gameList[indexToRemove].gameOver();
			this.prismaGameInventory.gameOver( this.gameList[indexToRemove].gameId,
				Number(this.gameList[indexToRemove].ScorePlayer1),
				Number(this.gameList[indexToRemove].ScorePlayer2))
			this.gameList.splice(indexToRemove, 1);
		}
	}


	ready_game(userId: number, joiningUser: number, server: Server) {

		const gameReadyData: gameReadyDto = {
			invitedId: userId,
			beenInvitedId: joiningUser
		}
		server.emit("gameReady", gameReadyData);
	}


	async startGame(player1: number, player2: number, server: Server) {
		console.log("game start with " + player1 + " " + player2);
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
			return game.gameId === gameIdToFind;
		});
	}
}