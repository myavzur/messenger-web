import { IUser } from "@/entities/user/interfaces";

import { IChat } from "../../interfaces";

export interface IChatCardProps {
	chat: IChat;
	currentUserId: IUser["id"];
	onClick?: (chat: IChat) => void;
}
