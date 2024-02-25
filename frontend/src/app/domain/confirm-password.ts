import { Channel } from "./channel";

export class ConfirmPassword {
	public passwordAttempt: string;
	public channel: Channel;

	constructor(passwordAttempt: string, channel: Channel) {
		this.passwordAttempt = passwordAttempt;
		this.channel = channel;
	}
}