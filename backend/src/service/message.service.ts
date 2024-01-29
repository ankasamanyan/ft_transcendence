import {Injectable} from '@nestjs/common';
import {Message} from "../domain/message";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MessageService {
  readonly prisma = new PrismaClient();

  //saves a message to the database
 async save(message: Message) {
     await this.prisma.message.create({
      data: {
        sender: message.senderId,
        receiver: message.receiverId,
        message: message.text,
        time: message.time,
      },
    }); 
  }
}

