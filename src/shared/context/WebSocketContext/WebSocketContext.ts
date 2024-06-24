import { createContext } from "react";

import { IChatSocket } from "./chat-connection.interface";
import { IPresenceSocket } from "./presence-connection.interface";

export interface IWebSocketContext {
	presenceSocket: IPresenceSocket | null;
	chatSocket: IChatSocket | null;
	closeConnections: () => void;
	openConnections: () => void;
}

export const WebSocketContext = createContext<IWebSocketContext>({
	presenceSocket: null,
	chatSocket: null,
	closeConnections: () => {
		return;
	},
	openConnections: () => {
		return;
	}
});
