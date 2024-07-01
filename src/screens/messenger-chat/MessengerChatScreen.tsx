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
import { useActiveChatStore } from "@/entities/chat/stores/active-chat";
import { ChatHeader, ChatHeaderSkeleton } from "@/entities/chat/ui/chat-header";

import { Header } from "@/shared/ui";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: FC = () => {
	const params = useParams<{ polymorphicId: string }>();

	const { data: authData } = useAuthorizeQuery();

	const activeChat = useActiveChatStore((state) => state.activeChat);
	const activeChatMessages = useActiveChatStore((state) => state.activeChatMessages);
	const setActiveChat = useActiveChatStore((state) => state.setActiveChat);
	const setActiveChatMessages = useActiveChatStore(
		(state) => state.setActiveChatMessages
	);

	const { isEventsEmitting, receiveChatWithHistory } =
		useReceiveChatWithHistoryEvent({
			onChatReceived: setActiveChat,
			onMessagesReceived: setActiveChatMessages
		});

	const isDataFetching = isEventsEmitting || !authData?.data;
	const isActiveChatAndMessagesFetching = isDataFetching || !activeChat;

	useEffect(() => {
		if (!params.polymorphicId) return;
		receiveChatWithHistory(params.polymorphicId);
	}, [params, receiveChatWithHistory]);

	return (
		<div className={styles.page}>
			<div className={styles.chat}>
				{isActiveChatAndMessagesFetching ? (
					<ChatHeaderSkeleton />
				) : (
					<ChatHeader
						chat={activeChat}
						currentUserId={authData.data.id}
					/>
				)}

				<div className={styles.messages}>
					{isActiveChatAndMessagesFetching ? (
						<MessageRowSkeleton count={15} />
					) : (
						activeChatMessages.map((message) => (
							<MessageRow
								key={message.id}
								message={message}
								chatType={activeChat.type}
								currentUserId={authData.data.id}
								onContextMenu={(data) => console.log(data.message.text)}
							/>
						))
					)}
				</div>

				<div className={styles.form}>
					{isActiveChatAndMessagesFetching ? (
						<SendMessageFormSkeleton />
					) : (
						<SendMessageForm chat={activeChat} />
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
