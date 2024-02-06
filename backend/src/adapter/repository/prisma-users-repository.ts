import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {User, Users} from "../../domain/user";
import {UserResponse, UsersResponse} from "../dto/users-response";

@Injectable()
export class PrismaUsersRepository {
    constructor(private prisma: PrismaService) {

    }

    async initializeUsers() {
        if (await this.prisma.user.count() === 0) {
            await this.prisma.user.createMany({
                data: [
                    {name: "Anahit", picture: "assets/placeholderAvatar.jpeg"},
                    {name: "Tania", picture: "assets/placeholderComrade.jpeg"},
                    {name: "Cedric", picture: "assets/placeholderComrade2.jpeg"},
                    {name: "Krisi", picture: "assets/placeholderComrade3.jpeg"},
                    {name: "Santiago", picture: "assets/placeholderComrade4.jpeg"},
                    {name: "Fedia", picture: "assets/placeholderComrade5.jpeg"},
                    {name: "Wolf", picture: "assets/placeholderComrade6.jpeg"},
                ]
            });
        }
    }
    async addUser(user: User) {
        await this.prisma.user.create({
            data: {
                name: user.name,
                picture: user.picture
            }}
        );
    }

    async getUsers(userId: number) {
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    not: Number(userId)
                }
            }
        }) as UserResponse[];
        return new UsersResponse(users);
    }

    async blockUser(users: Users) {
        const user = users.users[0];
        const blockedUser = users.users[1];

        await this.prisma.user.update ({
            where: {id: user.id },
            data: { blockedUsers: { connect:  { id: blockedUser.id } } }
        });
    }

    async unblockUser(users: Users) {
        const user = users.users[0];
        const unblockedUser = users.users[1];

        await this.prisma.user.update ({
            where: {id: user.id },
            data: { blockedUsers: { disconnect:  { id: unblockedUser.id } } }
        });
    }

    async getBlockedUsers(userId: number) {
        const userWithBlockedUsers = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { blockedUsers: true }
          });
        return userWithBlockedUsers?.blockedUsers;
      
    }
}