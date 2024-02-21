import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server} from "socket.io";
import {UsersRequest} from "../../adapter/dto/users-request";
import {GameService} from "../../service/game-service";

@WebSocketGateway({cors: {origin: '*'}})
export class GameGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private gameService: GameService) {

  }

  @SubscribeMessage('invitationToPlay')
  async invite(@MessageBody() request: UsersRequest) {
    await this.gameService.invite(UsersRequest.toDomain(request));
    this.server.emit("invitationSent");
  }
}