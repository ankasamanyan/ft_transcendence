import { Injectable } from '@nestjs/common';
import { MESSAGE_HISTORY } from 'src/mocks/messages.mock';
import { SelectedDialog } from 'src/domain/selected-dialog';
import { Observable, from, of } from 'rxjs';
import { SelectedDialogResponse } from 'src/domain/selected-dialog.dto';
//import { PrismaClient, Message } from '@prisma/client';

@Injectable()
export class MessageHistoryService {
	//constructor(private readonly prisma: PrismaClient) {}
	selectedDialog: SelectedDialogResponse = MESSAGE_HISTORY;

	getMessageHistory(): Observable<SelectedDialogResponse> {
		return of(this.selectedDialog);
		
	}

	/*addMessage(message: MessageDto): Promise<any> {
		return new Promise(resolve => {
			this.selectedDialog.push(message);
			resolve(this.selectedDialog);
		})
	}*/
}

