import cn from "classnames";
import { FC, memo, useRef } from "react";

import { Message } from "@/entities/chat/ui/message";

import { IMessageRowProps } from "./MessageRow.interface";
import styles from "./MessageRow.module.scss";

export const MessageRow: FC<IMessageRowProps> = memo(
	({ message, chatType, currentUserId, onContextMenu }) => {
		const rowElementRef = useRef<HTMLDivElement>(null);
		const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

		const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
			if (!onContextMenu || !rowElementRef.current) return;
			e.preventDefault();

			if (highlightTimeoutRef.current) {
				clearTimeout(highlightTimeoutRef.current);
			}

			rowElementRef.current.style.backgroundColor = "var(--color-primary-1000)";

			highlightTimeoutRef.current = setTimeout(() => {
				rowElementRef.current?.style.removeProperty("background-color");
			}, 2000);

			onContextMenu({
				data: message,
				mousePosition: {
					clientX: e.clientX,
					clientY: e.clientY
				}
			});
		};

		const isOwn = message.user.id === currentUserId;
		const isInGroupChat = chatType === "group";

		return (
			<div
				ref={rowElementRef}
				className={cn(styles.row, { [styles.row_own]: isOwn })}
				onContextMenu={handleContextMenu}
			>
				<Message
					message={message}
					isOwn={isOwn}
					onEmbeddedMessageClick={() => {}}
					uiConfig={{
						label: isInGroupChat,
						image: isInGroupChat
					}}
				/>
			</div>
		);
	}
);
