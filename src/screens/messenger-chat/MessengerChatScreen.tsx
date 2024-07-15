import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { ChatInfoSidebar } from "@/widgets/sidebar/ui/chat-info-sidebar";

import { MessageRow } from "@/features/chat/ui/message-row";
import { MessageRowSkeleton } from "@/features/chat/ui/message-row/MessageRowSkeleton";
import {
	SendMessageForm,
	SendMessageFormSkeleton
} from "@/features/chat/ui/send-message-form";
import { useContextMenu } from "@/features/context-menu/lib/hooks";
import { ContextMenuPainter } from "@/features/context-menu/ui";
import { MessageMenu } from "@/features/menu/ui/message-menu";

import { useAuthorizeQuery } from "@/entities/auth/lib/hooks";
import { IMessage } from "@/entities/chat/interfaces";
import { useReceiveChatWithHistoryEvent } from "@/entities/chat/lib/hooks";
import { useActiveChatStore } from "@/entities/chat/stores/active-chat";
import { ChatHeader, ChatHeaderSkeleton } from "@/entities/chat/ui/chat-header";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: FC = () => {
	const params = useParams<{ polymorphicId: string }>();
	const { data: authData } = useAuthorizeQuery();
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	const messagesContainerElementRef = useRef<HTMLDivElement>(null);
	const {
		contextMenuData,
		isContextMenuOpen,
		mousePosition,
		openContextMenu,
		closeContextMenu
	} = useContextMenu<IMessage>();

	const { chat, setChat, messages, setMessages } = useActiveChatStore(
		useShallow((state) => ({
			chat: state.chat,
			setChat: state.setChat,
			messages: state.messages,
			setMessages: state.setMessages
		}))
	);

	const { isChatFetching, receiveChatWithHistory } = useReceiveChatWithHistoryEvent({
		onChatReceived: setChat,
		onMessagesReceived: setMessages
	});

	useEffect(() => {
		if (!params.polymorphicId) return;
		receiveChatWithHistory(params.polymorphicId);
	}, [params, receiveChatWithHistory]);

	const isDataFetching = isChatFetching || !authData?.data;
	const isActiveChatAndMessagesReady = !isDataFetching && chat;

	return (
		<div className={styles.page}>
			<div className={styles.chat}>
				{isActiveChatAndMessagesReady ? (
					<ChatHeader
						chat={chat}
						currentUserId={authData.data.id}
						onClick={() => setIsInfoOpen(true)}
					/>
				) : (
					<ChatHeaderSkeleton />
				)}

				<div
					className={styles.messages}
					ref={messagesContainerElementRef}
				>
					{isActiveChatAndMessagesReady ? (
						messages.map((message) => (
							<MessageRow
								key={message.id}
								message={message}
								chatType={chat.type}
								currentUserId={authData.data.id}
								onContextMenu={openContextMenu}
							/>
						))
					) : (
						<MessageRowSkeleton count={15} />
					)}

					{isContextMenuOpen && (
						<ContextMenuPainter
							containerElementRef={messagesContainerElementRef}
							onClose={closeContextMenu}
							mousePosition={mousePosition!}
						>
							<MessageMenu message={contextMenuData!} />
						</ContextMenuPainter>
					)}
				</div>

				<div className={styles.form}>
					{isActiveChatAndMessagesReady ? (
						<SendMessageForm chat={chat} />
					) : (
						<SendMessageFormSkeleton />
					)}
				</div>
			</div>

			<ChatInfoSidebar
				isOpen={isInfoOpen}
				onClose={() => setIsInfoOpen(false)}
			/>
		</div>
	);
};

export default MessengerChatScreen;
