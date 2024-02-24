import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from "socket.io";
import { Users, User } from 'src/domain/user';
import { BlockedUsersService } from 'src/service/blocked-users.service';
import { FriendService } from 'src/service/friend.service';


@WebSocketGateway({cors: {origin: '*'}})
export class ProfileGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private friendService: FriendService,
    private blockedUserService: BlockedUsersService,
  ) {}

  @SubscribeMessage("acceptFriendRequest")
  async acceptFriendRequest(@MessageBody() data: {newFriend: User, meUser: User}) {
    await this.friendService.acceptFriendRequest(new Users([data.newFriend, data.meUser]));
    this.server.emit("friendRequestAccepted", {userId: data.newFriend.id, userId2: data.meUser.id});
  }

  @SubscribeMessage("declineFriendRequest")
  async declineFriendRequest(@MessageBody() data: {notFriend: User, meUser: User}) {
    await this.friendService.declineFriendRequest(new Users([data.notFriend, data.meUser]));
    this.server.emit("friendRequestDeclined", {userId: data.notFriend.id, userId2: data.meUser.id});
  }

  @SubscribeMessage("unBlockUser")
  async unBlockUser(@MessageBody() data: {meUser:User, unBlokee: User}) {
    await this.blockedUserService.unblockUser(data.meUser.id ,data.unBlokee.id);
    this.server.emit("userUnblocked", {userId: data.meUser.id, userId2: data.unBlokee.id});
  }

}
