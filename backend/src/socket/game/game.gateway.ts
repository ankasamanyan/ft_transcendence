import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {UsersRequest} from "../../adapter/dto/users-request";
import {GameService} from "../../service/game-service";
import { PaddleUpdateDto } from 'src/adapter/dto/game.dto';
import { QueueService } from 'src/service/queue-service';



@WebSocketGateway({cors: {origin: '*'}})
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
      private gameService: GameService,
      private queueService: QueueService) {

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
    this.server.emit("invitationSent", {invitedId: request.users[0].id, beenInvitedId: request.users[1].id});
  }

  @SubscribeMessage('acceptanceOfInvitation')
  async accept(@MessageBody() request: UsersRequest) {
    await this.gameService.accept(UsersRequest.toDomain(request));
    this.queueService.leaveQueue(request.users[0].id);
    this.queueService.leaveQueue(request.users[1].id);
    this.gameService.startGame(request.users[0].id, request.users[1].id, this.server);
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

  @SubscribeMessage('joinQueue')
  async joinQueue(@MessageBody() data: {userId: number}) {
    let userId = Number(data.userId);
    if (Number.isNaN(Number(userId))) {
      return ;
    }
    if (this.queueService.checkQueue() !== userId) {
      this.queueService.joinQueue(userId, this.server);
    }
  }

  @SubscribeMessage('checkQueue')
  async checkQueue() {
    const id = this.queueService.checkQueue();
    this.server.emit('checkQueue', {userId: id});
  }

  @SubscribeMessage('leaveQueue')
  async leaveQueue(@MessageBody() data: {userId: number}) {
    let userId = Number(data.userId);
    if (Number.isNaN(Number(userId))) {
      return ;
    }
    this.queueService.leaveQueue(userId);
  }


}
