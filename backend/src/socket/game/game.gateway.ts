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
    console.log(input);
    const response = await this.gameService.updatePaddle(input);
    // this.server.emit('GameUpdate', response);  // probably dont need this as the loop is running :)
    // this.server.emit('GameUpdate', response);  // probably dont need this as the loop is running :)
  }


  @SubscribeMessage('invitationToPlay')
  async invite(@MessageBody() request: UsersRequest) {
    await this.gameService.invite(UsersRequest.toDomain(request));
    this.server.emit("invitationSent", {invitedId: request.users[0].id, beenInvitedId: request.users[1].id});
  }

  @SubscribeMessage('acceptanceOfInvitation')
  async accept(@MessageBody() request: UsersRequest) {
    await this.gameService.accept(UsersRequest.toDomain(request));
    this.server.emit("invitationAccepted", {invitedId: request.users[0].id, beenInvitedId: request.users[1].id});
  }

  @SubscribeMessage('rejectionOfInvitation')
  async decline(@MessageBody() request: UsersRequest) {
    await this.gameService.deleteOrDecline(UsersRequest.toDomain(request));
    this.server.emit("invitationDeclined", {invitedId: request.users[0].id, beenInvitedId: request.users[1].id});
  }

  @SubscribeMessage('startGame')
  async startGame(@MessageBody() data: {user1: number, user2: number}) {
    console.log("startGame message subscribe")
    this.gameService.startGame(data.user1, data.user2, this.server);
  }
}
