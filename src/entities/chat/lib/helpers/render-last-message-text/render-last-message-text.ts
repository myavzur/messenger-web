import { ChatType, IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

interface IRenderLastMessageTextParams {
	chat: IChat;
	currentUserId: IUser["id"];
}

export const renderLastMessageText = ({
	chat,
	currentUserId
}: IRenderLastMessageTextParams) => {
	const lastMessage = chat.last_message;

	if (!lastMessage) {
		return "No messages...";
	}

	const isTextMessage = !lastMessage.attachments?.length && lastMessage?.text;

	if (chat.type === ChatType.LOCAL) {
		if (isTextMessage) return lastMessage.text;
		return "🖼️";
	}

	const user = lastMessage.user;
	const userPrefix = user.id === currentUserId ? "You" : user.account_name;

	if (isTextMessage) return `${userPrefix}: ${lastMessage.text}`;
	return `${userPrefix}: 🖼️`;
};
