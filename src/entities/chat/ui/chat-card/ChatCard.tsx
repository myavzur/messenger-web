import cn from "classnames";
import { FC } from "react";

import { formatUpdatedAtDate } from "@/shared/lib/helpers";
import { ImageCircle } from "@/shared/ui";

import { renderLastMessageText } from "../../lib/helpers/render-last-message-text";
import { serializeChat } from "../../lib/helpers/serialize-chat";
import { IChatCardProps } from "./ChatCard.interface";
import styles from "./ChatCard.module.scss";

export const ChatCard: FC<IChatCardProps> = ({
	chat,
	currentUserId,
	isActive = false
}) => {
	const serializedChat = serializeChat({ currentUserId, chat });
	const lastMessage = serializedChat.last_message;

	if (!lastMessage) {
		console.error(`Chat has no messages! ${chat.id}`);
		return <p>Error</p>;
	}

	return (
		<div className={cn(styles.card, { [styles.card_active]: isActive })}>
			<ImageCircle
				className={styles.image}
				src={serializedChat.image?.file_url}
				alt={serializedChat.title}
				placeholderText={serializedChat.title!}
			/>

			<div className={styles.info}>
				<div className={styles.top}>
					<div className={styles.title}>{serializedChat.title}</div>
					<div className={styles.time}>
						{formatUpdatedAtDate(lastMessage.created_at)}
					</div>
				</div>

				<div className={styles.message}>
					{renderLastMessageText({ chat, currentUserId })}
				</div>
			</div>
		</div>
	);
};
