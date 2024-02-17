import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import { UserResponse, UsersResponse } from "../dto/users-response";
import {User} from "../../domain/user";


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
		const statisticsById = await this.prisma.userStatistics.findUnique({
			where: { userId: Number(userId) }
		});
		return statisticsById;
	}

	async getAllUsersRankedByWins() {
		
		const rankedUserStatistics = await this.prisma.userStatistics.findMany({
		  orderBy: {
			wins: 'desc',
		  },
		  select: {
			userId: true,
		  },
		});
		const userIds = rankedUserStatistics.map(statistics => Number(statistics.userId));
		const rankedUsers = await this.prisma.user.findMany({
			where: {
			  id: {
				in: userIds,
			  },
			},
		  });
		  const sortedUsers = userIds.map(id => rankedUsers.find(user => user.id === id));
		  return new UsersResponse(sortedUsers.map((user) => {
            return new UserResponse(
                user.id,
                user.name,
                user.intra_login,
                user.picture);
        }));
	
	
	}
}