import { FC } from "react";

import { formatLastSeenAtDate } from "@/shared/lib/helpers";
import { Header, ImageCircle } from "@/shared/ui";

import { ChatType } from "../../interfaces";
import { serializeChat } from "../../lib/helpers";
import { IChatHeaderProps } from "./ChatHeader.interface";
import styles from "./ChatHeader.module.scss";

export const ChatHeader: FC<IChatHeaderProps> = ({ chat, currentUserId }) => {
	if (!chat) {
		throw new Error("FUCK YOU BITCH!");
	}

	const serializedChat = serializeChat({ chat, currentUserId });
	const informationText =
		serializedChat.type === ChatType.GROUP
			? `${serializedChat.participants_count} members`
			: formatLastSeenAtDate(serializedChat.user_last_seen_at!);

	return (
		<Header>
			<div className={styles.content}>
				<ImageCircle
					className={styles.image}
					placeholderText={serializedChat.title!}
					src={serializedChat.image?.file_url}
					alt={serializedChat.title}
				/>

				<p className={styles.title}>{serializedChat.title}</p>
				<p className={styles.info}>{informationText}</p>
			</div>
		</Header>
	);
};
