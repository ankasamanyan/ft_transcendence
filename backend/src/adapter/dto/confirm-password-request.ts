import { Channel } from "src/domain/channel";
import { ConfirmPassword } from "src/domain/confirm-password";

export class ConfirmPasswordRequest {
	constructor(public passwordAttempt: string, public channel: Channel) {}

	static toDomain(request: ConfirmPasswordRequest): ConfirmPassword {
		return new ConfirmPassword(
			request.passwordAttempt,
			request.channel
		);
	}

	static fromDomain(confirmPassword: ConfirmPassword) : ConfirmPasswordRequest {
		return new ConfirmPassword(
			confirmPassword.passwordAttempt,
			confirmPassword.channel
		)
	}
}