import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaDialogsRepository {
    constructor(private prisma: PrismaService) {

    }

    getDialogs(userId: number) {
    }
}