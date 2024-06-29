import { FC, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { SendMessageForm } from "@/features/send-message-form/ui";

import { useAuthorizeQuery } from "@/entities/auth/lib/hooks";
import { useReceiveChatWithHistoryEvent } from "@/entities/chat/lib/hooks";
import { useActiveChatStore } from "@/entities/chat/store/active-chat.store";
import { ChatHeader, ChatHeaderSkeleton } from "@/entities/chat/ui/chat-header";
import { Message, MessageSkeleton } from "@/entities/chat/ui/message";

import { Header } from "@/shared/ui";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: FC = () => {
	const params = useParams<{ polymorphicId: string }>();
	const topMessageElementRef = useRef<HTMLDivElement>(null);

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
	const isChatFetching = isDataFetching || !chat;
	const isMessagesFetching = isDataFetching && !messages.length;

	useEffect(() => {
		if (!params.polymorphicId) return;
		receiveChatWithHistory(params.polymorphicId);
	}, [params, receiveChatWithHistory]);

	return (
		<div className={styles.page}>
			<div className={styles.chat}>
				{isChatFetching ? (
					<ChatHeaderSkeleton />
				) : (
					<ChatHeader
						chat={chat}
						currentUserId={authData.data.id}
					/>
				)}

				<div className={styles.messages}>
					{isMessagesFetching ? (
						<MessageSkeleton count={15} />
					) : (
						messages.map((message) => {
							const isOwn = message.user.id === authData?.data.id;
							const isGroup = chat?.type === "group";

							return (
								<Message
									key={message.id}
									message={message}
									isOwn={isOwn}
									uiConfig={{
										label: isGroup,
										image: isGroup
									}}
								/>
							);
						})
					)}
					<div ref={topMessageElementRef}>Observe me UwU</div>
				</div>

				<div className={styles.form}>
					<SendMessageForm />
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
