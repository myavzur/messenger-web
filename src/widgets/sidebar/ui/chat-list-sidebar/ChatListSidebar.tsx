import { FC, useLayoutEffect } from "react";

import { ChatCardAnchor } from "@/features/chat-card-anchor/ui";

import { useAuthorizeQuery, useLogout } from "@/entities/auth/lib/hooks";
import { useReceiveChatListEvent } from "@/entities/chat/lib/hooks";
import { useChatsStore } from "@/entities/chat/store";

import { Button, Header, Icon } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

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
		<div className={styles.sidebar}>
			<Header>
				<Button
					leftIconElement={<Icon name="ui/menu-dots" />}
					onClick={logout}
				/>
			</Header>

			<div className={styles.sidebarContent}>
				{authData?.data &&
					chats.map((chat) => (
						<ChatCardAnchor
							key={chat.id}
							chat={chat}
							currentUserId={authData.data.id}
						/>
					))}
			</div>
		</div>
	);
};
