import { useCallback, useState } from "react";

import { useWebsocket } from "@/shared/context/websocket-context/hooks";
import { ISendMessagePayload } from "@/shared/context/websocket-context/interfaces";

interface IUseSendMessageEventParams {
	onMessageSent: () => void;
}

export const useSendMessageEvent = ({
	onMessageSent
}: IUseSendMessageEventParams) => {
	const { chatSocket } = useWebsocket();
	const [isEventEmitting, setIsEventEmitting] = useState(false);

	const sendMessage = useCallback(
		(payload: ISendMessagePayload) => {
			setIsEventEmitting(true);

			chatSocket?.emit("send-message", payload, () => {
				setIsEventEmitting(false);
				onMessageSent();
			});
		},
		[chatSocket, setIsEventEmitting, onMessageSent]
	);

	return { isEventEmitting, sendMessage };
};
