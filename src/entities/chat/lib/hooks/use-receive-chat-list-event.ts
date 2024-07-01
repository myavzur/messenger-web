import { useCallback, useState } from "react";

import authService from "@/entities/auth/services/auth.service";

import { IChat } from "../../interfaces";

interface IUseReceiveChatListEventParams {
	onChatListReceived: (chat: IChat[]) => void;
}

export const useReceiveChatListEvent = ({
	onChatListReceived
}: IUseReceiveChatListEventParams) => {
	const [isEventEmitting, setIsEventEmitting] = useState(false);

	const receiveChatList = useCallback(() => {
		setIsEventEmitting(true);

		authService.chatSocket.emit(
			"get-chats",
			{
				limit: 30,
				page: 1
			},
			(data) => {
				setIsEventEmitting(false);
				onChatListReceived(data.chats);
			}
		);
	}, [onChatListReceived]);

	return { isEventEmitting, receiveChatList };
};
