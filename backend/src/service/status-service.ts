import {Injectable} from '@nestjs/common';
import {from} from "rxjs";
import { PrismaStatusRepository } from 'src/adapter/repository/prisma-status-repository';

@Injectable()
export class StatusService {
	constructor(public statusRepository: PrismaStatusRepository) {}

	createStatus(userId: number) {
		return from(this.statusRepository.createStatus(userId));
	}

	getStatus(userId: number) {
		return from(this.statusRepository.getStatus(userId));
	}
}