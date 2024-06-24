import { ChatType, IChat } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

interface ISerializeChatParams {
	currentUserId: IUser["id"];
	chat: IChat;
}

export const serializeChat = ({
	currentUserId,
	chat
}: ISerializeChatParams): IChat => {
	if (chat.type === ChatType.GROUP) return chat;

	const withUser = chat.participants.find((p) => p.user.id !== currentUserId)?.user;
	if (!withUser) {
		console.error("No user found for chat", chat.id);
		return chat;
	}

	return {
		...chat,
		image: withUser.avatar,
		title: withUser.account_name
	};
};
