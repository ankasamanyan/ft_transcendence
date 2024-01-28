export class MessageDto {
	constructor(
		public senderId: string,
		public recieverId: string,
		public text: string,
		public time: string
	) {}
}
  
