import { FC } from "react";
import { NavLink } from "react-router-dom";

import { ChatCard } from "@/entities/chat/ui/chat-card";

import { IChatCardAnchorProps } from "./ChatCardAnchor.interface";

export const ChatCardAnchor: FC<IChatCardAnchorProps> = ({
	chat,
	currentUserId
}) => {
	return (
		<NavLink to={`/c/${chat.id}`}>
			{({ isActive }) => (
				<ChatCard
					isActive={isActive}
					chat={chat}
					currentUserId={currentUserId}
				/>
			)}
		</NavLink>
	);
};
