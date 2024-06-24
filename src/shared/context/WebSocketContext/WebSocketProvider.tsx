import React, {
	PropsWithChildren,
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef
} from "react";
import { io } from "socket.io-client";

import authService from "@/entities/auth/services/auth.service";

import { WebSocketContext } from "./WebSocketContext";
import { IChatSocket } from "./chat-connection.interface";
import { IPresenceSocket } from "./presence-connection.interface";

const CHAT_URL = import.meta.env.VITE_CHAT_SERVER_URL;
const PRESENCE_URL = import.meta.env.VITE_PRESENCE_SERVER_URL;

type IConnectionName = "chat_connection" | "presence_connection";

export const WebSocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const socketsRef = useRef<Map<IConnectionName, IChatSocket | IPresenceSocket>>(
		new Map()
	);

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

			socketsRef.current.set(connectionName, socket);

			return socket;
		};
	}, []);

	const openConnections = useCallback(() => {
		const chatSocket = openConnection("chat_connection", CHAT_URL) as IChatSocket;
		const presenceSocket = openConnection(
			"presence_connection",
			PRESENCE_URL
		) as IPresenceSocket;

		chatSocket.on("connect", () => console.log("Connected to chat server"));
		chatSocket.on("disconnect", () => console.log("Disconnected from chat server"));
		presenceSocket.on("connect", () => console.log("Connected to presence server"));
		presenceSocket.on("disconnect", () =>
			console.log("Disconnected from presence server")
		);
	}, [openConnection]);

	const closeConnections = useCallback(() => {
		socketsRef.current.forEach((socket) => {
			socket.disconnect();
		});
	}, []);

	useLayoutEffect(() => {
		openConnections();
		return () => closeConnections();
	}, [openConnections, closeConnections]);

	return (
		<WebSocketContext.Provider
			value={{
				chatSocket: socketsRef.current.get("chat_connection")!,
				presenceSocket: socketsRef.current.get("presence_connection")!,
				closeConnections,
				openConnections
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};
