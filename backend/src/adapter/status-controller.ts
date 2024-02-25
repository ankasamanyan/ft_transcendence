import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { StatusService } from 'src/service/status-service';

@Controller('/status')
export class StatusController {
	constructor(private statusService: StatusService) {}

	@Post('/new/:userId')
	createStatus(@Param('userId') userId: number) {
		return this.statusService.createStatus(userId);
	}

	@Get('/status/:userId')
	getStatus(@Param('userId') userId: number) {
		return this.statusService.getStatus(userId);
	}

	@Get('/available/:userId')
	isAvailable(@Param('userId') userId: number) {
		return this.statusService.isAvailable(userId);
	}
}