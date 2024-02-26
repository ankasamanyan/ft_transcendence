// import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
// import { QueueService } from 'src/service/queue-service';

// @Controller('/queue')
// export class QueueController {
// 	constructor(private queueService: QueueService) {}

// 	//changes status to queuing
// 	@Post('/add/:userId')
// 	queue(@Param('userId') userId: number) {
// 		return this.queueService.queue(userId);
// 	}

// 	//changes status to playing
// 	@Delete('/remove/:userId')
// 	removeFromQueueToPlayMatch(@Param('userId') userId: number) {
// 		return this.queueService.removeFromQueueToPlayMatch(userId);
// 	}

// 	@Get('other-player')
// 	findOtherPlayer() {
// 		return this.queueService.findOtherPlayer()
// 	}
// }