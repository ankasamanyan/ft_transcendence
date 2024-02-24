import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from "socket.io";
import { UsersRequest } from 'src/adapter/dto/users-request';
import { Users, User } from 'src/domain/user';
import { FriendService } from 'src/service/friend.service';


@WebSocketGateway({cors: {origin: '*'}})
export class ProfileGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private friendService: FriendService,
  ) {}

  @SubscribeMessage("acceptFriendRequest")
  async handleMessage(@MessageBody() data: {newFriend: User, meUser: User}) {
    // console.log("receiving subscribe message accept friend reqest " + data.newFriend.id + data.meUser.id);
    await this.friendService.acceptFriendRequest(new Users([data.newFriend, data.meUser]));
    this.server.emit("FriendRequestAccepted", {userId: data.newFriend.id, userId2: data.meUser.id});
  }
}

