import React, { useEffect } from "react";

import { ChatCardAnchor } from "@/features/chat-card-anchor/ui";

import { useAuthorizeQuery, useLogout } from "@/entities/auth/lib/hooks";
import { useChatsStore } from "@/entities/chat/store";

import { useWebsocket } from "@/shared/context/websocket-context/hooks";
import { Button, Header, Icon } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

export const ChatListSidebar: React.FC = () => {
	const { data: authData } = useAuthorizeQuery();

	const logout = useLogout();
	const { chatSocket } = useWebsocket();

	const chats = useChatsStore((state) => state.chats);
	const setChats = useChatsStore((state) => state.setChats);

	useEffect(() => {
		chatSocket?.emit(
			"get-chats",
			{
				limit: 30,
				page: 1
			},
			(data) => {
				setChats(data.chats);
			}
		);
	}, [chatSocket, setChats]);

	return (
		<div className={styles.sidebar}>
			<Header className={styles.Header}>
				<Button
					leftIconElement={<Icon name="menu-dots" />}
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
