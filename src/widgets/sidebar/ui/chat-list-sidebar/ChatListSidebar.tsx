import { FC, useCallback, useEffect, useRef, useState } from "react";

import { ChatCardAnchor } from "@/features/chat/ui/chat-card-anchor";
import { NavigationMenu } from "@/features/menu/ui/navigation-menu";

import { useAuthorizeQuery } from "@/entities/auth/lib/hooks";
import { useReceiveChatListEvent } from "@/entities/chat/lib/hooks";
import { useChatListStore } from "@/entities/chat/stores/chat-list";
import { ChatCardSkeleton } from "@/entities/chat/ui/chat-card";

import { Button, Header, Icon } from "@/shared/ui";

import styles from "./ChatListSidebar.module.scss";

export const ChatListSidebar: FC = () => {
	const navigationElementRef = useRef<HTMLDivElement>(null);
	const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);

	const openNavigationMenu = useCallback(() => {
		setIsNavigationMenuOpen(true);
	}, [setIsNavigationMenuOpen]);

	const closeNavigationMenu = useCallback(() => {
		setIsNavigationMenuOpen(false);
	}, [setIsNavigationMenuOpen]);

	const { data: authData } = useAuthorizeQuery();

	const chatList = useChatListStore((state) => state.chatList);
	const setChatList = useChatListStore((state) => state.setChatList);

	const { isChatListFetching, receiveChatList } = useReceiveChatListEvent({
		onChatListReceived: setChatList
	});
	const isChatListReady = !isChatListFetching && chatList.length && authData?.data;

	useEffect(() => {
		receiveChatList();
	}, [receiveChatList]);

	return (
		<>
			<Header>
				<nav
					className={styles.navigation}
					ref={navigationElementRef}
				>
					<Button
						leftIconElement={<Icon name="ui/menu-dots" />}
						onClick={openNavigationMenu}
						aria-label="Navigation"
						title="Navigation"
					/>

					{isNavigationMenuOpen && (
						<div className={styles.menu}>
							<NavigationMenu
								containerElementRef={navigationElementRef}
								onClose={closeNavigationMenu}
							/>
						</div>
					)}
				</nav>
			</Header>

			<div className={styles.content}>
				{isChatListReady ? (
					chatList.map((chat) => (
						<ChatCardAnchor
							key={chat.id}
							chat={chat}
							currentUserId={authData.data.id}
						/>
					))
				) : (
					<ChatCardSkeleton count={6} />
				)}
			</div>
		</>
	);
};
