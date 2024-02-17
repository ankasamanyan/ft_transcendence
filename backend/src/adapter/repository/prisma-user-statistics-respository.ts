import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaUserStatisticsRespository {
    constructor(private prisma: PrismaService) {}

	async addWin(userId: number) {
		await this.prisma.userStatistics.update({
			where: {
				userId: Number(userId)
			},
			data : {
				wins: {
					increment: 1
				  }
			}
		});
	}

	async addLose(userId: number) {
		await this.prisma.userStatistics.update({
			where: {
				userId: Number(userId)
			},
			data : {
				losses: {
					increment: 1
				  }
			}
		});
	}

	async initScore(userId: number) {
		await this.prisma.userStatistics.create({
			data: {
				userId: Number(userId),
				wins: Number(0),
				losses: Number(0)
			}
		})
	}

	async getWins(userId: number) {
		const user = await this.prisma.userStatistics.findUnique({
			where: { userId: Number(userId) },
			select: { wins: true }
		});
		return user.wins;
	}

	async getLosses(userId: number) {
		const user = await this.prisma.userStatistics.findUnique({
			where: { userId: Number(userId) },
			select: { losses: true }
		});
		return user.losses;
	}

	async getUserStatistics(userId: number) {
		const userStatistics = await this.prisma.userStatistics.findUnique({
			where: { userId: Number(userId) }
		});
		return userStatistics;
	}
}