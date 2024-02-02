import {Users} from "../../domain/user";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaChannelRepository{
    constructor(private prisma: PrismaService) {

    }

    createChannel(users: Users) {
    }
}