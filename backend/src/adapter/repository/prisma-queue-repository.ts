import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";


//if there is no other player on the queue, add the player
//if there is already someone waiting, return the userId and remove from queue
@Injectable()
export class PrismaQueueRepository {
	constructor(private prisma: PrismaService) {}

	async queue(userId: number) {
		await this.prisma.$transaction([
			this.prisma.queue.create({
				data: {
					userId: Number(userId)
				}
			}),

			this.prisma.status.updateMany({
				where: {
					userId: Number(userId)
				},
				data: {
					status: 'queuing'
				}
			}),
		]);
	}    


	async removeFromQueueToPlayMatch(userId: number) {
		await this.prisma.$transaction([
			this.prisma.queue.deleteMany({
			where: {
				userId: Number(userId)
			}
		}),

		this.prisma.status.updateMany({
			where: {
				userId: Number(userId)
			},
			data: {
				status: 'playing'
			}
		}),
	]);
	}

	async findOtherPlayer() {
		const otherPlayer = await this.prisma.queue.findFirst({
		})
		if (!otherPlayer)
			return null;
		return otherPlayer;
	}
}