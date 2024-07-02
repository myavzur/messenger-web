import { useEffect } from "react";

import authService from "@/entities/auth/services/auth.service";
import { useActiveChatStore } from "@/entities/chat/stores/active-chat";
import { useChatListStore } from "@/entities/chat/stores/chat-list";

import { useLatestValue } from "@/shared/lib/hooks";

export const SocketManager = () => {
	const activeChat = useActiveChatStore((state) => state.activeChat);
	const addActiveChatMessage = useActiveChatStore(
		(state) => state.addActiveChatMessage
	);

	const chatList = useChatListStore((state) => state.chatList);
	const updateChatListRoughly = useChatListStore(
		(state) => state.updateChatListRoughly
	);

	const handleNewMessageEvent = useLatestValue((data: any) => {
		console.debug("[Chat Event]: New message event", data);

		// Добавляем сообщения в активный чат если он установлен.
		const isSameChatMessage = data.chat_id === activeChat?.id;
		if (isSameChatMessage) {
			addActiveChatMessage(data.message);
		}

		// Если есть такой чат в памяти - обновляем последнее сообщение.
		const hasChatInList = chatList.some((chat) => chat.id === data.chat_id);
		if (hasChatInList) {
			updateChatListRoughly({
				chatId: data.chat_id,
				newData: {
					last_message: data.message
				}
			});
		}
	});

	useEffect(() => {
		authService.chatSocket.on("connect", () => {
			console.log("Socket connected [Chat].");
		});
		authService.chatSocket.on("disconnect", () => {
			console.log("Socket disconnected [Chat].");
		});
		authService.chatSocket.on("new-message", handleNewMessageEvent.current);

		authService.presenceSocket.on("connect", () => {
			console.log("Socket connected [Presence].");
		});
		authService.presenceSocket.on("disconnect", () => {
			console.log("Socket disconnected [Presence].");
		});

		return () => {
			authService.chatSocket.off("connect");
			authService.chatSocket.off("disconnect");
			authService.presenceSocket.off("connect");
			authService.presenceSocket.off("disconnect");
		};
	}, [handleNewMessageEvent]);

	return null;
};
