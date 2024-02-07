import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Users, User} from "../../domain/user";


@Injectable()
export class PrismaBlockedUsersRepository {
    constructor(private prisma: PrismaService) {

    }
    async blockUser(users: Users) {
        //maybe need to make sure only one unique blockedUser can be created
        await this.prisma.blockedUser.create({
            data: {
                blockerId: users.users[0].id,
                blockedId: users.users[1].id,
            }
        });
    }

}