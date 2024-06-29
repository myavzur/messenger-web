import { useCallback, useState } from "react";

import { useWebsocket } from "@/shared/context/websocket-context/hooks";

import { IChat } from "../../interfaces";

interface IUseReceiveChatListEventParams {
	onChatListReceived: (chat: IChat[]) => void;
}

export const useReceiveChatListEvent = ({
	onChatListReceived
}: IUseReceiveChatListEventParams) => {
	const { chatSocket } = useWebsocket();
	const [isEventEmitting, setIsEventEmitting] = useState(false);

	const receiveChatList = useCallback(() => {
		setIsEventEmitting(true);

		chatSocket?.emit(
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
	}, [chatSocket, onChatListReceived]);

	return { isEventEmitting, receiveChatList };
};
