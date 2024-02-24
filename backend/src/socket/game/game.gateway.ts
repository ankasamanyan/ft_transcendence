import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {UsersRequest} from "../../adapter/dto/users-request";
import {GameService} from "../../service/game-service";
import { PaddleUpdateDto } from 'src/adapter/dto/game.dto';



@WebSocketGateway({cors: {origin: '*'}})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
      private gameService: GameService) {

  }

  @SubscribeMessage('paddleUpdate')
  async paddleArrowUp(@MessageBody() input: PaddleUpdateDto) {
    console.log("gamepaddle update backend with value");
    console.log(input);
    this.gameService.updatePaddle(input);
  }


  @SubscribeMessage('invitationToPlay')
  async invite(@MessageBody() request: UsersRequest) {
    await this.gameService.invite(UsersRequest.toDomain(request));
    this.server.emit("invitationSent");
  }

  @SubscribeMessage('startGame')
  async startGame(@MessageBody() data: {user1: number, user2: number}) {
    console.log("startGame message subscribe")
    this.gameService.startGame(data.user1, data.user2, this.server);
  }
}
