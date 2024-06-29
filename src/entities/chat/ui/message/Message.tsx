import cn from "classnames";
import { CSSProperties, FC, memo } from "react";

import { Icon, ImageCircle } from "@/shared/ui";
import { MessageEmbedded } from "@/shared/ui/message-embedded";

import { IMessage } from "../../interfaces";
import { IMessageProps } from "./Message.interface";
import styles from "./Message.module.scss";

export const Message: FC<IMessageProps> = memo(
	({
		message,
		onContextMenu,
		onEmbeddedMessageClick,
		uiConfig = { label: true, image: true },
		isOwn = false
	}) => {
		const user = message.user;
		const attachments = message.attachments;
		const reply = message.reply_for;

		const shouldRenderImage = uiConfig.image && !isOwn;
		const shouldRenderLabel = uiConfig.label && !isOwn;

		const stylesInline = {
			"--highlight-color": `var(--highlight-color-${user.theme}, red)`
		} as CSSProperties;

		const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			onContextMenu?.({
				message,
				mousePosition: {
					x: e.clientX,
					y: e.clientY
				}
			});
		};

		const handleEmbeddedMessageClick = (message: IMessage) => {
			onEmbeddedMessageClick?.(message);
		};

		return (
			<div
				style={stylesInline}
				className={cn(styles.message, { [styles.message_own]: isOwn })}
				onContextMenu={handleContextMenu}
			>
				{shouldRenderImage && (
					<ImageCircle
						className={styles.image}
						src={user.avatar?.file_url}
						alt={user.account_name}
						placeholderText={user.account_name}
					/>
				)}

				<div className={styles.content}>
					{shouldRenderLabel && (
						<p className={cn(styles.row, styles.label)}>{user.account_name}</p>
					)}

					{reply && (
						<div className={styles.row}>
							<MessageEmbedded
								message={reply}
								onClick={handleEmbeddedMessageClick}
							/>
						</div>
					)}

					{attachments.length > 0 && (
						<p className={styles.row}>{attachments.length} attachments</p>
					)}

					{message.text && (
						<p className={cn(styles.row, styles.text)}>{message.text}</p>
					)}

					<div className={styles.appendix}>
						<Icon
							name="ui/appendix"
							width="15"
							height="15"
						/>
					</div>
				</div>
			</div>
		);
	}
);
