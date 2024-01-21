import { Injectable } from '@nestjs/common';
import { MESSAGE_HISTORY } from 'src/mocks/messages.mock';
import { MessageDto } from './dto/message.dto';
//import { PrismaClient, Message } from '@prisma/client';

@Injectable()
export class MessageHistoryService {
	//constructor(private readonly prisma: PrismaClient) {}
	messageHistory: MessageDto[] = MESSAGE_HISTORY;

	getMessageHistory(): Promise<any> {
		return new Promise(resolve => {
			resolve(this.messageHistory);
		})
	}

	addMessage(message: MessageDto): Promise<any> {
		return new Promise(resolve => {
			this.messageHistory.push(message);
			resolve(this.messageHistory);
		})
	}
}

