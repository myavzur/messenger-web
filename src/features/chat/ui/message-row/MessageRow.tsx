import { FC } from "react";

import { Message } from "@/entities/chat/ui/message";

import { IMessageRowProps } from "./MessageRow.interface";

export const MessageRow: FC<IMessageRowProps> = ({
	message,
	chatType,
	currentUserId,
	onContextMenu
}) => {
	const isOwn = message.user.id === currentUserId;
	const isGroup = chatType === "group";

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

	return (
		<div onContextMenu={handleContextMenu}>
			<Message
				message={message}
				isOwn={isOwn}
				onEmbeddedMessageClick={() => {}}
				uiConfig={{
					label: isGroup,
					image: isGroup
				}}
			/>
		</div>
	);
};
