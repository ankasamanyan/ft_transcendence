import {Injectable} from '@nestjs/common';
import {from} from "rxjs";
import { PrismaQueueRepository } from 'src/adapter/repository/prisma-queue-repository';

@Injectable()
export class QueueService {
	constructor(public queueRepository: PrismaQueueRepository) {}

	queue(userId: number) {
		return from(this.queueRepository.queue(userId));
	}

	removeFromQueueToPlayMatch(userId: number) {
		return from(this.queueRepository.removeFromQueueToPlayMatch(userId));
	}

	findOtherPlayer() {
		return from(this.queueRepository.findOtherPlayer());
	}
}