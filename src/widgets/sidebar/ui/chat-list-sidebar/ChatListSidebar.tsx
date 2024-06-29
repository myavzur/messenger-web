import { FC, useEffect } from "react";

import { ChatCardAnchor } from "@/features/chat/ui/chat-card-anchor";

import { useAuthorizeQuery, useLogout } from "@/entities/auth/lib/hooks";
import { useReceiveChatListEvent } from "@/entities/chat/lib/hooks";
import { useChatsStore } from "@/entities/chat/store";
import { ChatCardSkeleton } from "@/entities/chat/ui/chat-card";

import { Button, Header, Icon } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

export const ChatListSidebar: FC = () => {
	const { data: authData } = useAuthorizeQuery();

	const logout = useLogout();

	const chats = useChatsStore((state) => state.chats);
	const setChats = useChatsStore((state) => state.setChats);

	const { isEventEmitting, receiveChatList } = useReceiveChatListEvent({
		onChatListReceived: setChats
	});

	const isChatsFetching = (isEventEmitting && !chats.length) || !authData?.data;

	useEffect(() => {
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

			<div className={styles.content}>
				{isChatsFetching ? (
					<ChatCardSkeleton count={6} />
				) : (
					chats.map((chat) => (
						<ChatCardAnchor
							key={chat.id}
							chat={chat}
							currentUserId={authData.data.id}
						/>
					))
				)}
			</div>
		</>
	);
};
