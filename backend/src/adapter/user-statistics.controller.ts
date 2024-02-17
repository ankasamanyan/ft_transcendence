import {Controller, Get, Param, Post, Put, Body} from '@nestjs/common';
import { UserStatisticsService } from 'src/service/user-statistics.service';
import { UserRequest } from './dto/users-request';

@Controller('/user-statistics')
export class UserStatisticsController {
	constructor(private userStatisticsService: UserStatisticsService) {}

	@Get('/wins/:userId')
	getWins(@Param('userId') userId: number) {
		return this.userStatisticsService.getWins(userId);
	}

	@Get('/losses/:userId')
	getLosses(@Param('userId') userId: number) {
		return this.userStatisticsService.getLosses(userId);
	}

	@Get('/stats')
	getUserStatistics(@Body() request: UserRequest) {
		return this.userStatisticsService.getUserStatistics(UserRequest.toDomain(request).id);
	}

	@Put('/add-win/:userId') 
	addWin(@Param('userId') userId: number) {
		return this.userStatisticsService.addWin(userId);
	}
	
	@Put('/add-lose/:userId') 
	addLose(@Param('userId') userId: number) {
		return this.userStatisticsService.addLose(userId);
	}

	@Post('/:userId')
	initScore(@Param('userId') userId: number) {
		return this.userStatisticsService.initScore(userId);
	}

	@Get('/ranking')
	getRanking() {
		return this.userStatisticsService.getRanking();
	}
}