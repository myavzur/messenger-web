import { useCallback } from "react";

import { useWebsocket } from "@/shared/context/websocket-context/hooks";

import { IChat } from "../../interfaces";

interface IUseReceiveChatListEventParams {
	onChatListReceived: (chat: IChat[]) => void;
}

export const useReceiveChatListEvent = ({
	onChatListReceived
}: IUseReceiveChatListEventParams) => {
	const { chatSocket } = useWebsocket();

	const receiveChatList = useCallback(() => {
		chatSocket?.emit(
			"get-chats",
			{
				limit: 30,
				page: 1
			},
			(data) => {
				onChatListReceived(data.chats);
			}
		);
	}, [chatSocket, onChatListReceived]);

	return { receiveChatList };
};
