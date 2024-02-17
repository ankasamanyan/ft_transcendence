import {Injectable} from '@nestjs/common';
import { PrismaUserStatisticsRespository } from 'src/adapter/repository/prisma-user-statistics-respository';
import {from} from "rxjs";
import { PrismaUsersRepository } from 'src/adapter/repository/prisma-users-repository';

@Injectable()
export class UserStatisticsService {
	constructor(private prismaUserStatisticsRepository: PrismaUserStatisticsRespository
		, private prismaUsersRepository: PrismaUsersRepository) {}

	addWin(userId: number) {
		return from(this.prismaUserStatisticsRepository.addWin(userId));
	}

	addLose(userId: number) {
		return from(this.prismaUserStatisticsRepository.addLose(userId));
	}

	initScore(userId: number) {
		return from(this.prismaUserStatisticsRepository.initScore(userId));
	}

	getWins(userId: number) {
		return from(this.prismaUserStatisticsRepository.getWins(userId));
	}

	getLosses(userId: number) {
		return from(this.prismaUserStatisticsRepository.getLosses(userId));
	}

	getUserStatistics(userId: number) {
		return from(this.prismaUserStatisticsRepository.getUserStatistics(userId));
	}

	getRanking() {
		return from(this.prismaUserStatisticsRepository.getAllUsersRankedByWins())
	}
}