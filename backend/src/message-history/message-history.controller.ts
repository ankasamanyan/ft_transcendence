import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageHistoryService } from './message-history.service';
import { MessageDto } from './dto/message.dto';

@Controller('message-history')
export class MessageHistoryController {
	constructor(private messageHistoryService: MessageHistoryService) { }

	@Get()
	async getMessageHistory() {
		const messageHistory = await this.messageHistoryService.getMessageHistory();
		return messageHistory;
	}

	@Post()
	async addMessage(@Body() messageDto: MessageDto) {
		const message = await this.messageHistoryService.addMessage(messageDto);
		return message;
	}
}
