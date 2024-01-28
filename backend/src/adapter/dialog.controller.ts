import {Controller, Get, Param} from '@nestjs/common';
import { WebSocketServer, WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import {DialogService} from "../service/dialog.service";
import {of} from "rxjs";
import {SelectedDialogResponse} from "./dto/selected-dialog-response";

/*
@Controller('/selected-dialog/')
export class DialogController {
  constructor(private dialogService: DialogService) {}

  @Get(':senderId/:receiverId')
  getDialog(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return of(SelectedDialogResponse.fromDomain(this.dialogService.getDialog(senderId, receiverId)));
  }
}
*/

@WebSocketGateway()
//implements are optional to handle number of clients
export class DialogGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  users: number = 0;
  
  async handleConnection() {
    this.users++;

    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;

    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    //sends message to all clients who are listening
    client.broadcase.emit('chat', message);
  }
}