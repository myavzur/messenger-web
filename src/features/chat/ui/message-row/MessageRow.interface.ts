import { ChatType, IMessage } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

export interface IMessageRowProps {
	chatType: ChatType;
	message: IMessage;
	currentUserId?: IUser["id"];
	onContextMenu?: (data: {
		message: IMessage;
		mousePosition: {
			x: number;
			y: number;
		};
	}) => void;
}
