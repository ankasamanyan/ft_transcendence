import { Message } from "src/domain/message";
import { SelectedDialog } from "src/domain/selected-dialog";
import { SelectedDialogResponse } from "src/domain/selected-dialog.dto";


export const MESSAGE_HISTORY = new SelectedDialogResponse([
	new Message("1", "20", "Hello!", "12:45"),
	new Message("2", "1", "Goodbye User 1!", "12:46")
]);