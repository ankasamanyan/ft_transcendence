import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaUploadRepository {
	constructor(private prisma: PrismaService) {}

	async saveImagetoUser(filepath: string, userId: number) {
		////console.log("This is the filepath", filepath);
		////console.log("This is the userid:", userId);
		await this.prisma.user.update({
			where: { id: Number(userId) },
			data: { picture: filepath }
		  });
	}

  }