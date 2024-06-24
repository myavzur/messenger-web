import { Socket } from "socket.io-client";

import { IAttachment } from "@/entities/attachment/interfaces";
import { IChat, IMessage } from "@/entities/chat/interfaces";
import { IUser } from "@/entities/user/interfaces";

import {
	IPaginatedData,
	IPaginationBody
} from "@/shared/interfaces/pagination.interface";

interface IChatServerEvents {
	"new-chat": (data: IChat) => void;
	"new-message": (data: { chat_id: IChat["id"]; message: IMessage }) => void;
	"gone-messages": (data: {
		chatId: IChat["id"];
		messageIds: IMessage["id"][];
	}) => void;
	"pinned-message": (data: IMessage) => void;
}

interface IChatClientEvents {
	"get-chats": (
		payload: {
			polymorphicId: IChat["id"] | IUser["id"];
		},
		callback: (
			data: {
				chats: IChat[];
			} & IPaginatedData
		) => void
	) => void;

	"get-chat": (
		payload: {
			polymorphicId: IChat["id"] | IUser["id"];
		},
		callback: (data: IChat) => void
	) => void;

	"get-chat-history": (
		payload: {
			chatId: IChat["id"];
		} & IPaginationBody,
		callback: (
			data: {
				messages: IMessage[];
				chat_id: IChat["id"];
			} & IPaginatedData
		) => void
	) => void;

	"create-group-chat": (
		payload: {
			title: IChat["title"];
			participantsIds: IUser["id"][];
		},
		callback: (data: IChat) => void
	) => void;

	"send-message": (
		payload: {
			polymorphicId: IChat["id"] | IUser["id"];
			replyForId?: IMessage["id"];
			fileIds?: IAttachment["id"][];
			text: IMessage["text"];
		},
		callback: (data: { message_id: IMessage["id"]; chat_id: IChat["id"] }) => void
	) => void;

	"change-message": () => void;

	"pin-message": (payload: { messageId: IMessage["id"] }) => void;

	"delete-messages": (payload: {
		chatId: IChat["id"];
		messageIds: IMessage["id"][];
	}) => void;
}

export type IChatSocket = Socket<IChatServerEvents, IChatClientEvents>;
