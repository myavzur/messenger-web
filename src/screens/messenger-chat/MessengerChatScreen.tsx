import { FC, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { SendMessageForm } from "@/features/send-message-form/ui";

import { useAuthorizeQuery } from "@/entities/auth/lib/hooks";
import { useReceiveChatWithHistoryEvent } from "@/entities/chat/lib/hooks";
import { useActiveChatStore } from "@/entities/chat/store/active-chat.store";
import { ChatHeader } from "@/entities/chat/ui/chat-header";
import { Message } from "@/entities/chat/ui/message";

import { Header } from "@/shared/ui";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: FC = () => {
	const params = useParams<{ polymorphicId: string }>();
	const { data: userData } = useAuthorizeQuery();

	const topMessageElementRef = useRef<HTMLDivElement>(null);

	const chat = useActiveChatStore((state) => state.chat);
	const messages = useActiveChatStore((state) => state.messages);
	const setChat = useActiveChatStore((state) => state.setChat);
	const setMessages = useActiveChatStore((state) => state.setMessages);

	const { receiveChatWithHistory } = useReceiveChatWithHistoryEvent({
		onChatReceived: setChat,
		onMessagesReceived: setMessages
	});

	useLayoutEffect(() => {
		if (!params.polymorphicId) return;
		receiveChatWithHistory(params.polymorphicId);
	}, [params, receiveChatWithHistory]);

	return (
		<div className={styles.page}>
			<div className={styles.chat}>
				{chat && userData?.data && (
					<ChatHeader
						chat={chat}
						currentUserId={userData?.data.id}
					/>
				)}

				<div className={styles.messages}>
					{messages.length > 0 &&
						messages.map((message) => {
							const isOwn = message.user.id === userData?.data.id;
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
						})}
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
