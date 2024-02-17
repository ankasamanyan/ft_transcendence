import { Injectable, Logger } from '@nestjs/common';
import { PrismaMutedUsersRepository } from 'src/adapter/repository/prisma-muted-users-repository';
import {from} from "rxjs";

@Injectable()
export class MuteTimer {
	constructor(private prismaMutedUsersRepository: PrismaMutedUsersRepository) {}

	//the time is given in milliseconds
	setTimer(channelId: number, mutedUserId: number) {
		setTimeout(async () => {
		  await this.unmuteUser(channelId, mutedUserId);
		}, 30000);
	  }

	private async unmuteUser(channelId: number, mutedUserId: number) {
		return from(this.prismaMutedUsersRepository.unmuteUser(channelId, mutedUserId));
	}
}