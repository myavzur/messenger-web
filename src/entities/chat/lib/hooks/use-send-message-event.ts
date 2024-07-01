import { useCallback, useState } from "react";

import { ISendMessagePayload } from "@/entities/auth/interfaces/socket-io";
import authService from "@/entities/auth/services/auth.service";

interface IUseSendMessageEventParams {
	onMessageSent: () => void;
}

export const useSendMessageEvent = ({
	onMessageSent
}: IUseSendMessageEventParams) => {
	const [isEventEmitting, setIsEventEmitting] = useState(false);

	const sendMessage = useCallback(
		(payload: ISendMessagePayload) => {
			setIsEventEmitting(true);

			authService.chatSocket.emit("send-message", payload, () => {
				setIsEventEmitting(false);
				onMessageSent();
			});
		},
		[onMessageSent]
	);

	return { isEventEmitting, sendMessage };
};
