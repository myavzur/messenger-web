import { useCallback, useState } from "react";

import authService from "@/entities/auth/services/auth.service";

import { IChat } from "../../interfaces";

interface IUseReceiveChatListEventParams {
	onChatListReceived: (chat: IChat[]) => void;
}

export const useReceiveChatListEvent = ({
	onChatListReceived
}: IUseReceiveChatListEventParams) => {
	const [isChatListFetching, setIsChatListFetching] = useState(false);

	const receiveChatList = useCallback(() => {
		setIsChatListFetching(true);

		authService.chatSocket.emit(
			"get-chats",
			{
				limit: 30,
				page: 1
			},
			(data) => {
				setIsChatListFetching(false);
				onChatListReceived(data.chats);
			}
		);
	}, [onChatListReceived]);

	return { isChatListFetching, receiveChatList };
};
