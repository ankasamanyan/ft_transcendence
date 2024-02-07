import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Users, User} from "../../domain/user";
import { UserResponse, UsersResponse } from "../dto/users-response";


@Injectable()
export class PrismaBlockedUsersRepository {
    constructor(private prisma: PrismaService) {

    }
    async blockUser(users: Users) {
        await this.prisma.blockedUser.create({
            data: {
                blockerId: users.users[0].id,
                blockedId: users.users[1].id,
            }
        });
    }

    async unblockUser(blockerId: number, blockedId: number) {
            await this.prisma.blockedUser.deleteMany({
              where: {
                  AND: [
                 { blockerId: blockerId },
                 { blockedId: blockedId }
              ]}
         });
    }

    async getBlockedUsers(userId: number) {
        await this.prisma.$transaction(async (prisma) => {
            const blockedUserEntries = await this.prisma.blockedUser.findMany({
                where: { blockerId: userId }
            });
            const blockedUserIds = blockedUserEntries.map(entry => entry.blockedId );
            const users = await this.prisma.user.findMany({
                where: {
                    id: { in: blockedUserIds },
                    }
            });
            return new UsersResponse(users.map((user) => {
                return new UserResponse(
                    user.id,
                    user.name,
                    user.intra_login,
                    user.picture);
            }));
        });
    }
}