import React from "react";

import { formatCreatedAtDate } from "@/shared/lib/helpers";
import { ImageCircle } from "@/shared/ui";

import { serializeChat } from "../../lib/helpers/serialize-chat";
import { IChatCardProps } from "./ChatCard.interface";
import styles from "./ChatCard.module.scss";

export const ChatCard: React.FC<IChatCardProps> = ({ chat, currentUserId }) => {
	const serializedChat = serializeChat({ currentUserId, chat });
	const lastMessage = serializedChat.last_message;

	if (!lastMessage) {
		console.error(`Chat has no messages! ${chat.id}`);
		return <p>Error</p>;
	}

	return (
		<div className={styles.card}>
			<ImageCircle
				className={styles.image}
				src={serializedChat.image?.file_url}
				alt={serializedChat.title}
				placeholderText={serializedChat.title!}
			/>

			<div className={styles.wrapper}>
				<div className={styles.top}>
					<div className={styles.title}>{serializedChat.title}</div>
					<div className={styles.time}>
						{formatCreatedAtDate(lastMessage.created_at)}
					</div>
				</div>

				<div className={styles.message}>{lastMessage.text}</div>
			</div>
		</div>
	);
};
