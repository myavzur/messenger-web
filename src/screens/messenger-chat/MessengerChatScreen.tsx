import { FC, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { SendMessageForm } from "@/features/send-message-form/ui";

import { useReceiveChatWithHistoryEvent } from "@/entities/chat/lib/hooks";
import { useActiveChatStore } from "@/entities/chat/store/active-chat.store";
import { MessageEmbedded } from "@/entities/chat/ui/message-embedded";

import { Header, ImageCircle } from "@/shared/ui";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: FC = () => {
	const params = useParams<{ polymorphicId: string }>();

	const topMessageElementRef = useRef<HTMLDivElement>(null);

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
				<Header className={styles.header}>
					<ImageCircle
						placeholderText="🦊"
						src="https://picsum.photos/200"
						alt="fox"
					/>
				</Header>

				<div className={styles.messages}>
					{messages.length > 0 &&
						messages.map((message) => (
							<MessageEmbedded
								key={message.id}
								message={message}
							/>
						))}
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
