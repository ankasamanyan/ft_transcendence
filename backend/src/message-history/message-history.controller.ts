import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageHistoryService } from './message-history.service';
import { MessageDto } from './dto/message.dto';

@Controller('/selected-dialog/')
export class MessageHistoryController {
	constructor(private messageHistoryService: MessageHistoryService) { }

	@Get(':senderId:receiverId')
	getMessageHistory(@Param('senderId') senderId: string, @Param('receiverId')receiverId: string) {
		const messageHistory = this.messageHistoryService.getMessageHistory();
		return messageHistory;
	}

	/*@Post()
	async addMessage(@Body() messageDto: MessageDto) {
		const message = await this.messageHistoryService.addMessage(messageDto);
		return message;
	}*/
}
