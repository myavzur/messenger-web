import React from "react";

import { useLogout } from "@/entities/auth/lib/hooks";
import { useChatsStore } from "@/entities/chat/store";

import { Button, Icon, SidebarHeader } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

export const ChatListSidebar: React.FC = () => {
	const logout = useLogout();
	const chats = useChatsStore((state) => state.chats);

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
					<h1>{chat.title}</h1>
				))}
			</div>
		</aside>
	);
};
