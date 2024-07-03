import { IMousePosition } from "@/features/context-menu/interfaces";

import { ChatType, IMessage } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

export interface IMessageRowProps {
	chatType: ChatType;
	message: IMessage;
	currentUserId?: IUser["id"];
	onContextMenu?: (data: { data: IMessage; mousePosition: IMousePosition }) => void;
}
