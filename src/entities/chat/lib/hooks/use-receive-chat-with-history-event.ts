import { useCallback, useState } from "react";

import authService from "@/entities/auth/services/auth.service";
import { IUser } from "@/entities/user/interfaces";

import { IChat, IMessage } from "../../interfaces";

interface IUseChatWithHistoryEventParams {
	onChatReceived: (chat: IChat) => void;
	onMessagesReceived: (messages: IMessage[]) => void;
}

/**
 * Custom hook that fetches chat and its history using websocket events.
 * It updates the active chat and its messages in the store. */
export const useReceiveChatWithHistoryEvent = ({
	onChatReceived,
	onMessagesReceived
}: IUseChatWithHistoryEventParams) => {
	const [isEventsEmitting, setIsEventsEmitting] = useState(false);

	const receiveChatWithHistory = useCallback(
		(polymorphicId: IChat["id"] | IUser["id"]) => {
			setIsEventsEmitting(true);

			authService.chatSocket.emit("get-chat", { polymorphicId }, (chat: IChat) => {
				onChatReceived(chat);

				authService.chatSocket.emit(
					"get-chat-history",
					{
						chatId: chat.id,
						limit: 100,
						page: 1
					},
					(data) => {
						onMessagesReceived(data.messages);
						setIsEventsEmitting(false);
					}
				);
			});
		},
		[onChatReceived, onMessagesReceived]
	);

	return { isEventsEmitting, receiveChatWithHistory };
};
