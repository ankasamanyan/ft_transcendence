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

  gameReadyId: {user1:number, user2:number}[] = [];

  constructor(
      private gameService: GameService,
      private queueService: QueueService) {

  }

  @SubscribeMessage('paddleUpdate')
  async paddleArrowUp(@MessageBody() input: PaddleUpdateDto) {
    // ////console.log("gamepaddle update backend with value");
    ////console.log(input);
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
    // this.gameService.startGame(request.users[0].id, request.users[1].id, this.server);
    this.server.emit("invitationAccepted", {invitedId: request.users[0].id, beenInvitedId: request.users[1].id});
    this.gameReadyId.push({user1: request.users[0].id, user2: request.users[1].id})
  }

  @SubscribeMessage('checkIfGameReady')
  async checkIfGameReady(@MessageBody() data: {userId: number}) {
    const userId = Number(data.userId)
    const index = this.gameReadyId.findIndex((ind_data: {user1:number, user2:number}) => {
      return (ind_data.user1 === userId || ind_data.user2 === userId)
    });

    if (index !== -1) {
			await new Promise(resolve => setTimeout(resolve, 35));
    this.server.emit("checkIfGameReadyPositive", {userId1: this.gameReadyId[index].user1, userId2: this.gameReadyId[index].user2});
    }
  }

  @SubscribeMessage('rejectionOfInvitation')
  async decline(@MessageBody() request: UsersRequest) {
    await this.gameService.deleteOrDecline(UsersRequest.toDomain(request));
    this.server.emit("invitationDeclined", {invitedId: request.users[0].id, beenInvitedId: request.users[1].id});
  }

  @SubscribeMessage('startGame')
  async startGame(@MessageBody() data: {user1: number, user2: number}) {
    const index = this.gameReadyId.findIndex((ind_data: {user1:number, user2:number}) => {
        return (ind_data.user1 == data.user1 && ind_data.user2 == data.user2) || (ind_data.user1 == data.user2 && ind_data.user2 == data.user1);
    });
    if (index !== -1) {
      this.gameReadyId.splice(index, 1);
    }
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
