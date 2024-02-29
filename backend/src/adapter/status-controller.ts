import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth.jwt.guard';
import { StatusService } from 'src/service/status-service';

@Controller('/status')
export class StatusController {
	constructor(private statusService: StatusService) {}

	@UseGuards(JWTAuthGuard)
	@Post('/new/:userId')
	createStatus(@Param('userId') userId: number) {
		return this.statusService.createStatus(userId);
	}
	
	@UseGuards(JWTAuthGuard)
	@Get('/status/:userId')
	getStatus(@Param('userId') userId: number) {
		return this.statusService.getStatus(userId);
	}
	
	@UseGuards(JWTAuthGuard)
	@Get('/available/:userId')
	isAvailable(@Param('userId') userId: number) {
		return this.statusService.isAvailable(userId);
	}
}