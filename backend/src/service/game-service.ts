import { Injectable } from '@nestjs/common';
import { Users } from "../domain/user";
import { from } from "rxjs";
import { PrismaGameInvitationRepository } from 'src/adapter/repository/prisma-game-invitation-repository';
import { PrismaService } from './prisma.service';

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
    ){}
  }

class GameStartResponseDto {
	constructor(
	  public gameId:number,
	  public player1:number,
	  public player2:number,
	){}
  }


export class GameData {
	
	player1: number
	player2: number
	gameId: number

	ScorePlayer1: number = 0;
	ScorePlayer2: number = 0;
	PositionPaddle1: number = 0;
	PositionPaddle2: number = 0;
	PositionBall: [number, number] = [50, 50];
	VelocityBall: [number, number] = [0.5, 0.5];

	GameStatus: number = 1;

	windowWidth: number = 100;
	windowHeight: number = 100;
	ballRadius: number = 2;
	paddleWidth: number = 1.5;
	paddleHeight: number = 35;

	interval: NodeJS.Timer;

	constructor(userId1: number, userId2: number, gameID: number) {
		this.player1 = userId1;
		this.player2 = userId2;
		this.gameId = gameID;
	}

	/// timer(gameLoop, 1000);


	// gameLoop() {	
		// check if ball scores
		// check if ball bounces from paddle or wall
	// }

	updatePaddle(userId: number, paddleMove: number) {
		// change paddle position
	};

	gameState(): GameResponsetDto {
		return new GameResponsetDto(this.gameId, this.PositionPaddle1, this.PositionPaddle2);
	};
}


@Injectable()
export class GameService {
	constructor(private prismaGameInvitationRepository: PrismaGameInvitationRepository,
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
		if (gameIndex != -1) {
			this.gameList[gameIndex].updatePaddle(gameRequestDto.userId, gameRequestDto.paddleMove);
			return this.gameList[gameIndex].gameState();
		}
		return undefined;
    }

	async gameFinished(gameIdToRemove: number) {
		const indexToRemove = this.gameList.findIndex((game) => {
			game.gameId === gameIdToRemove;
		});
		if (indexToRemove !== -1) {
			const datbaseGameObj = await this.prisma.game.update({
				where: {
					id: this.gameList[indexToRemove].gameId
				},
				data: {
					score1: Number(this.gameList[indexToRemove].ScorePlayer1),
					score2: Number(this.gameList[indexToRemove].ScorePlayer2),
					finished: true
				}
			});
			/// also need to update in the game histroy of both players
			// all of this can be subfunciton since 3 different calls to database :)
			this.gameList.splice(indexToRemove, 1);
		}
	}

	async startGame(player1: number, player2: number): Promise<GameStartResponseDto>{
		const datbaseGameObj = await this.prisma.game.create({
			data: {
                player1: Number(player1),
                player2: Number(player2),
            }
		});
		const gameToStart = new GameData(player1, player2, datbaseGameObj.id);
		this.gameList.push(gameToStart);
		return (new GameStartResponseDto(gameToStart.gameId, gameToStart.player1, gameToStart.player2));
	}

	findGameIndex(gameIdToFind: number): number{
		return this.gameList.findIndex((game) => {
			game.gameId === gameIdToFind;
		});
	}
}