import {Injectable} from '@nestjs/common';
import { Server } from 'socket.io';
import {from} from "rxjs";
import { PrismaQueueRepository } from 'src/adapter/repository/prisma-queue-repository';
import { GameService } from './game-service';

@Injectable()
export class QueueService {
	constructor(private gameService: GameService) {}
	empty = true;
	userId = -1;

	joinQueue(joiningUser: number, server: Server) {
		if (this.empty === true) {
			this.empty = false;
			this.userId = joiningUser;
			return ;
		}
		else {
			// this.gameService.startGame(this.userId, joiningUser, server)
			this.gameService.ready_game(this.userId, joiningUser, server)
			this.empty = true
			this.userId = -1
		}
	}
  
	checkQueue(): number {
		return this.userId;
	}
  
	leaveQueue(leavingUser: number) {
		if (this.empty === false) {
			if (leavingUser === this.userId) {
				this.empty = true
				this.userId = -1
			}
		}
	}
}