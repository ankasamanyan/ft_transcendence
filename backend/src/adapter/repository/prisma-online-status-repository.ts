import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";


//if there is no other player on the queue, add the player
//if there is already someone waiting, return the userId and remove from queue
@Injectable()
export class PrismaOnlineStatusRepository {
	constructor(private prisma: PrismaService) {}

	async setOnline(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			}
		})
		if (user) {
			await this.prisma.user.update({
				where: {
					id: userId
				},
				data:  {
					online: true
				}
			})
		}
	};
	async setOffline(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			}
		})
		if (user) {
			await this.prisma.user.update({
				where: {
					id: userId
				},
				data:  {
					online: false
				}
			})
		}
	};
}