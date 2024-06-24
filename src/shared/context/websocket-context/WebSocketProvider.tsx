import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { io } from "socket.io-client";

import authService from "@/entities/auth/services/auth.service";

import { WebSocketContext } from "./WebSocketContext";
import { IChatSocket } from "./interfaces/chat-connection.interface";
import { IPresenceSocket } from "./interfaces/presence-connection.interface";

const CHAT_URL = import.meta.env.VITE_CHAT_SERVER_URL;
const PRESENCE_URL = import.meta.env.VITE_PRESENCE_SERVER_URL;

type IConnectionName = "chat_connection" | "presence_connection";

export const WebSocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const openConnection = useMemo(() => {
		return (connectionName: IConnectionName, connectionUrl: string) => {
			const accessToken = authService.getAccessToken();
			if (!accessToken) {
				console.log(
					`Failed to open "${connectionName}" connection: Not authorized.`
				);
			}

			const socket = io(connectionUrl, {
				extraHeaders: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			return socket;
		};
	}, []);

	const [chatSocket, setChatSocket] = useState<IChatSocket | null>(() => {
		return openConnection("chat_connection", CHAT_URL);
	});
	const [presenceSocket, setPresenceSocket] = useState<IPresenceSocket | null>(
		() => {
			return openConnection("presence_connection", PRESENCE_URL);
		}
	);

	const openConnections = useCallback(() => {
		const chatSocket = openConnection("chat_connection", CHAT_URL);
		const presenceSocket = openConnection("presence_connection", PRESENCE_URL);

		chatSocket.on("connect", () => console.log("Connected to chat server"));
		chatSocket.on("disconnect", () => console.log("Disconnected from chat server"));
		presenceSocket.on("connect", () => console.log("Connected to presence server"));
		presenceSocket.on("disconnect", () =>
			console.log("Disconnected from presence server")
		);

		setChatSocket(chatSocket);
		setPresenceSocket(presenceSocket);
	}, [openConnection]);

	const closeConnections = useCallback(() => {
		if (chatSocket) chatSocket.disconnect();
		if (presenceSocket) presenceSocket.disconnect();
	}, [chatSocket, presenceSocket]);

	return (
		<WebSocketContext.Provider
			value={{
				chatSocket,
				presenceSocket,
				closeConnections,
				openConnections
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};
