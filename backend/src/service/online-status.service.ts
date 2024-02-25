import {Injectable} from '@nestjs/common';
import { PrismaOnlineStatusRepository } from 'src/adapter/repository/prisma-online-status-repository';

@Injectable()
export class OnlineStatusService {
	constructor(
		private prismaOnlineStatusRepository: PrismaOnlineStatusRepository
	) {}

	async setOnline(userId: number) {
		this.prismaOnlineStatusRepository.setOnline(userId);
	}

	async setOffline(userId: number) {
		this.prismaOnlineStatusRepository.setOffline(userId);
	}
}
