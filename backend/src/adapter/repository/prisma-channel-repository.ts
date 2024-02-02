import {Users} from "../../domain/user";
import {ChannelRepository} from "../../domain/channel-repository";
import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PrismaChannelRepository implements ChannelRepository {
    constructor(private prisma: PrismaService) {

    }

    createChannel(users: Users) {
    }
}