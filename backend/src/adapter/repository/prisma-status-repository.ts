import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaStatusRepository {
	constructor(private prisma: PrismaService) {}

	async createStatus(userId: number) {
		await this.prisma.status.create({
			data: {
				userId: Number(userId),
				status: 'available'
			}
		})
	}

}