import {PrismaService} from "../../service/prisma.service";
import {Injectable} from "@nestjs/common";
import {Users} from "../../domain/user";
import {UserResponse, UsersResponse} from "../dto/users-response";

@Injectable()
export class PrismaFriendRepository {
    constructor(private prisma: PrismaService) {

    }

    async sendAFriendRequest(users: Users) {
        await this.prisma.friend.create({
            data: {
                sent_user_id: Number(users.users[0].id),
                received_user_id: Number(users.users[1].id),
                status: "PENDING"
            }}
        );
    }

    async getFriends(userId: number) {
        const userIdAsInteger = Number(userId);
        const friends: Array<{id: number; name: string; picture: string}> = await this.prisma.$queryRaw`
            SELECT u.id as id,
                   u.name as name,
                   u.picture as picture
            FROM "User" u
            JOIN "Friend" f ON u.id = CASE
                                    WHEN f.sent_user_id = ${userIdAsInteger} THEN f.received_user_id
                                    WHEN f.received_user_id = ${userIdAsInteger} THEN f.sent_user_id
                                END
            WHERE f.status = 'ACCEPTED' AND (f.sent_user_id = ${userIdAsInteger} OR f.received_user_id = ${userIdAsInteger})
            `;
        return new UsersResponse(friends.map((user) => {
            return new UserResponse(
                user.id,
                user.name,
                user.picture);
        }));
    }

    async initializeFriends() {
        if (await this.prisma.friend.count() === 0) {
            await this.prisma.friend.createMany({
                data: [
                    {sent_user_id: 1, received_user_id: 2, status: "ACCEPTED"},
                    {sent_user_id: 1, received_user_id: 3, status: "ACCEPTED"},
                    {sent_user_id: 1, received_user_id: 4, status: "ACCEPTED"},
                ]
            });
        }
    }
}