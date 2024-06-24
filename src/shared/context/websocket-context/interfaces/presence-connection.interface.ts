import { Socket } from "socket.io-client";

import { IChat } from "@/entities/chat/interfaces";
import { UserStatus } from "@/entities/user/interfaces";

interface IPresenceServerEvents {
	"new-status-in-local-chat": (data: {
		chatId: IChat["id"];
		status: UserStatus;
	}) => void;
}

interface IPresenceClientEvents {
	"change-status": (payload: { status: UserStatus }) => void;
}

export type IPresenceSocket = Socket<IPresenceServerEvents, IPresenceClientEvents>;
