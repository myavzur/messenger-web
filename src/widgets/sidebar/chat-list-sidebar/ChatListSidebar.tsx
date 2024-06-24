import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogout } from "@/entities/auth/lib/hooks";
import { useChatsStore } from "@/entities/chat/store";

import { useWebsocket } from "@/shared/context/websocket-context/hooks";
import { Button, Icon, SidebarHeader } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

export const ChatListSidebar: React.FC = () => {
	const navigate = useNavigate();
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
		<aside className={styles.sidebar}>
			<SidebarHeader className={styles.sidebarHeader}>
				<Button
					leftIconElement={<Icon name="menu-dots" />}
					onClick={logout}
				/>
			</SidebarHeader>

			<div className={styles.sidebarContent}>
				{chats.map((chat) => (
					<h1
						key={chat.id}
						onClick={() => navigate(`/messenger/${chat.id}`)}
					>
						{chat.title}
					</h1>
				))}
			</div>
		</aside>
	);
};
