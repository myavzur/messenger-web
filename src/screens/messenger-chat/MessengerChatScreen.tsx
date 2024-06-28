import React, { useCallback, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { SendMessageForm } from "@/features/send-message-form/ui";

import { IChat } from "@/entities/chat/interfaces";

import { useWebsocket } from "@/shared/context/websocket-context/hooks";
import { Header, ImageCircle } from "@/shared/ui";

import styles from "./MessengerChatScreen.module.scss";

const MessengerChatScreen: React.FC = () => {
	const params = useParams<{ polymorphicId: string }>();
	const { chatSocket } = useWebsocket();

	// TODO: Remove temp
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	const receiveChatById = useCallback(
		(id: IChat["id"]) => {
			chatSocket?.emit("get-chat", { polymorphicId: id }, (data: IChat) => {
				console.log(data);
			});
		},
		[chatSocket]
	);

	useLayoutEffect(() => {
		if (!params.polymorphicId) return;
		receiveChatById(params.polymorphicId);
	}, [params, receiveChatById]);

	return (
		<div className={styles.page}>
			<div className={styles.chat}>
				<div onClick={() => setIsInfoOpen(true)}>
					<Header className={styles.header}>
						<ImageCircle
							placeholderText="🦊"
							src="https://picsum.photos/200"
							alt="fox"
						/>
					</Header>
				</div>

				<div className={styles.messages}>
					<p>Message</p>
					<p>Message 2</p>
				</div>

				<div className={styles.form}>
					<SendMessageForm />
				</div>
			</div>

			<CSSTransition
				in={isInfoOpen}
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
				<div
					className={styles.info}
					onClick={() => setIsInfoOpen(false)}
				>
					<Header>Информация!</Header>
				</div>
			</CSSTransition>
		</div>
	);
};

export default MessengerChatScreen;
