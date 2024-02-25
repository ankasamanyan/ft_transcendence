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
        }
      }
    );
  }

  async getFriends(userId: number) {
    const userIdAsInteger = Number(userId);
    const friends: Array<{
      id: number;
      name: string;
      intra_login: string;
      picture: string,
      email: string,
      is_authenticated: boolean,
      tfa_enabled: boolean,
      tfa_secret: string | undefined,
    }> = await this.prisma.$queryRaw`
        SELECT u.id               as id,
               u.name             as name,
               u.intra_login      as intra_login,
               u.picture          as picture,
               u.email            as email,
               u.is_authenticated as is_authenticated,
               u.tfa_enabled      as tfa_enabled,
                u.tfa_secret        as tfa_secret
        FROM "User" u
                 JOIN "Friend" f ON u.id = CASE
                                               WHEN f.sent_user_id = ${userIdAsInteger} THEN f.received_user_id
                                               WHEN f.received_user_id = ${userIdAsInteger} THEN f.sent_user_id
            END
        WHERE f.status = 'ACCEPTED'
          AND (f.sent_user_id = ${userIdAsInteger} OR f.received_user_id = ${userIdAsInteger})
    `;
    return new UsersResponse(friends.map((user) => {
      return new UserResponse(
        user.id,
        user.name,
        user.intra_login,
        user.picture,
        user.email,
        user.is_authenticated,
        user.tfa_enabled,
          user.tfa_secret);
    }));
  }

  async befriendable(sentUserId: number, receivedUserId: number) {
    const friendRequest = await this.prisma.friend.findFirst({
      where: {
        OR: [
          {sent_user_id: Number(sentUserId), received_user_id: Number(receivedUserId)},
          {sent_user_id: Number(receivedUserId), received_user_id: Number(sentUserId)}
        ]
      }
    });

    if (!friendRequest || friendRequest.status === "DECLINED") {
      return true;
    }
    return false;
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

  //gets the pending requests that the user needs to answer
  async getPendingRequests(userId: number) {
    const pendingRequests = await this.prisma.friend.findMany({
      where: {
        received_user_id: Number(userId),
        status: "PENDING"
      },
      select: {sent_user_id: true}
    });
    const pendingIds = pendingRequests.map(friend => friend.sent_user_id);
    const pendingUsers = await this.prisma.user.findMany({
      where: {
        id: {in: pendingIds}
      }
    });
    return new UsersResponse(pendingUsers.map((user) => {
      return new UserResponse(
        user.id,
        user.name,
        user.intra_login,
        user.picture,
        user.email,
        user.is_authenticated,
          user.tfa_enabled,
          user.tfa_secret);
    }));
  }

  async acceptFriendRequest(users: Users) {
    await this.prisma.friend.updateMany({
      where: {
        sent_user_id: Number(users.users[0].id),
        received_user_id: Number(users.users[1].id)
      },
      data: {
        status: "ACCEPTED"
      }
    })
  }

  async declineFriendRequest(users: Users) {
    await this.prisma.friend.updateMany({
      where: {
        sent_user_id: Number(users.users[0].id),
        received_user_id: Number(users.users[1].id)
      },
      data: {
        status: "DECLINED"
      }
    })
  }


}