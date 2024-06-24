import { useContext } from "react";

import { IWebSocketContext, WebSocketContext } from "../WebSocketContext";

export const useWebsocket = () => {
	const context = useContext(WebSocketContext) as IWebSocketContext;

	if (!context) {
		throw new Error("useWebsocket must be used withing WebSocketContextProvider");
	}

	return context;
};
