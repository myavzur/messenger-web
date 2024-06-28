import { FC, useLayoutEffect } from "react";

import { ChatCardAnchor } from "@/features/chat-card-anchor/ui";

import { useAuthorizeQuery, useLogout } from "@/entities/auth/lib/hooks";
import { useReceiveChatListEvent } from "@/entities/chat/lib/hooks";
import { useChatsStore } from "@/entities/chat/store";

import { Button, Header, Icon } from "@/shared/ui";

export const ChatListSidebar: FC = () => {
	const { data: authData } = useAuthorizeQuery();

	const logout = useLogout();

	const chats = useChatsStore((state) => state.chats);
	const setChats = useChatsStore((state) => state.setChats);

	const { receiveChatList } = useReceiveChatListEvent({
		onChatListReceived: setChats
	});

	useLayoutEffect(() => {
		receiveChatList();
	}, [receiveChatList]);

	return (
		<>
			<Header>
				<Button
					leftIconElement={<Icon name="ui/menu-dots" />}
					onClick={logout}
				/>
			</Header>

			{authData?.data &&
				chats.map((chat) => (
					<ChatCardAnchor
						key={chat.id}
						chat={chat}
						currentUserId={authData.data.id}
					/>
				))}
		</>
	);
};
