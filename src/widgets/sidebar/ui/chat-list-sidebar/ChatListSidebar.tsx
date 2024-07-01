import { FC, useEffect } from "react";

import { ChatCardAnchor } from "@/features/chat/ui/chat-card-anchor";

import { useAuthorizeQuery, useLogout } from "@/entities/auth/lib/hooks";
import { useReceiveChatListEvent } from "@/entities/chat/lib/hooks";
import { useChatListStore } from "@/entities/chat/stores/chat-list";
import { ChatCardSkeleton } from "@/entities/chat/ui/chat-card";

import { Button, Header, Icon } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

export const ChatListSidebar: FC = () => {
	const { data: authData } = useAuthorizeQuery();

	const logout = useLogout();

	const chatList = useChatListStore((state) => state.chatList);
	const setChatList = useChatListStore((state) => state.setChatList);

	const { isEventEmitting, receiveChatList } = useReceiveChatListEvent({
		onChatListReceived: setChatList
	});

	const isChatListFetching =
		(isEventEmitting && !chatList.length) || !authData?.data;

	useEffect(() => {
		receiveChatList();
	}, [receiveChatList]);

	return (
		<>
			<Header>
				<Button
					leftIconElement={<Icon name="ui/menu-dots" />}
					onClick={logout}
					aria-label="Navigation"
					title="Navigation"
				/>
			</Header>

			<div className={styles.content}>
				{isChatListFetching ? (
					<ChatCardSkeleton count={6} />
				) : (
					chatList.map((chat) => (
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
