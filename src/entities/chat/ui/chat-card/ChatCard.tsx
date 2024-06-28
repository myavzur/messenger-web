import cn from "classnames";
import { FC } from "react";

import { formatCreatedAtDate } from "@/shared/lib/helpers";
import { ImageCircle } from "@/shared/ui";

import { serializeChat } from "../../lib/helpers/serialize-chat";
import { IChatCardProps } from "./ChatCard.interface";
import styles from "./ChatCard.module.scss";

export const ChatCard: FC<IChatCardProps> = ({
	chat,
	currentUserId,
	isActive = false,
	onClick
}) => {
	const serializedChat = serializeChat({ currentUserId, chat });
	const lastMessage = serializedChat.last_message;

	if (!lastMessage) {
		console.error(`Chat has no messages! ${chat.id}`);
		return <p>Error</p>;
	}

	return (
		<div
			className={cn(styles.card, { [styles.card_active]: isActive })}
			onClick={() => onClick?.(chat)}
		>
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
