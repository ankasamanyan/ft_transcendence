import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaUploadRepository {
	constructor(private prisma: PrismaService) {}

	async saveImagetoUser(file: Express.Multer.File, userId: number) {
		await this.prisma.user.update({
			where: { id: Number(userId) },
			data: { picture: file.path }
		  });
	}

  }