import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { MessageRow } from "@/features/chat/ui/message-row";
import { MessageRowSkeleton } from "@/features/chat/ui/message-row/MessageRowSkeleton";
import {
	SendMessageForm,
	SendMessageFormSkeleton
} from "@/features/chat/ui/send-message-form";

import { useAuthorizeQuery } from "@/entities/auth/lib/hooks";
import { useReceiveChatWithHistoryEvent } from "@/entities/chat/lib/hooks";
import { useActiveChatStore } from "@/entities/chat/stores/active-chat.store";
import { ChatHeader, ChatHeaderSkeleton } from "@/entities/chat/ui/chat-header";

import { Header } from "@/shared/ui";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: FC = () => {
	const params = useParams<{ polymorphicId: string }>();

	const { data: authData } = useAuthorizeQuery();

	const chat = useActiveChatStore((state) => state.chat);
	const messages = useActiveChatStore((state) => state.messages);
	const setChat = useActiveChatStore((state) => state.setChat);
	const setMessages = useActiveChatStore((state) => state.setMessages);

	const { isEventsEmitting, receiveChatWithHistory } =
		useReceiveChatWithHistoryEvent({
			onChatReceived: setChat,
			onMessagesReceived: setMessages
		});

	const isDataFetching = isEventsEmitting || !authData?.data;
	const isChatAndHistoryFetching = isDataFetching || !chat;

	useEffect(() => {
		if (!params.polymorphicId) return;
		receiveChatWithHistory(params.polymorphicId);
	}, [params, receiveChatWithHistory]);

	return (
		<div className={styles.page}>
			<div className={styles.chat}>
				{isChatAndHistoryFetching ? (
					<ChatHeaderSkeleton />
				) : (
					<ChatHeader
						chat={chat}
						currentUserId={authData.data.id}
					/>
				)}

				<div className={styles.messages}>
					{isChatAndHistoryFetching ? (
						<MessageRowSkeleton count={15} />
					) : (
						messages.map((message) => (
							<MessageRow
								key={message.id}
								message={message}
								chatType={chat.type}
								currentUserId={authData.data.id}
								onContextMenu={(data) => console.log(data.message.text)}
							/>
						))
					)}
				</div>

				<div className={styles.form}>
					{isChatAndHistoryFetching ? (
						<SendMessageFormSkeleton />
					) : (
						<SendMessageForm chat={chat} />
					)}
				</div>
			</div>

			<CSSTransition
				in={false}
				timeout={300}
				classNames={{
					enter: styles.infoEnter,
					enterActive: styles.infoEnter_active,
					enterDone: styles.infoEnter_done,
					exit: styles.infoExit,
					exitActive: styles.infoExit_active,
					exitDone: styles.infoExit_done
				}}
				mountOnEnter={true}
				unmountOnExit={true}
			>
				<div className={styles.info}>
					<Header>Информация!</Header>
				</div>
			</CSSTransition>
		</div>
	);
};

export default MessengerChatScreen;
