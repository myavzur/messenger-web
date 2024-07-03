import { useCallback, useState } from "react";

import { ISendMessagePayload } from "@/entities/auth/interfaces/socket-io";
import authService from "@/entities/auth/services/auth.service";

interface IUseSendMessageEventParams {
	onMessageSent: () => void;
}

export const useSendMessageEvent = ({
	onMessageSent
}: IUseSendMessageEventParams) => {
	const [isMessageSending, setIsMessageSending] = useState(false);

	const sendMessage = useCallback(
		(payload: ISendMessagePayload) => {
			setIsMessageSending(true);

			authService.chatSocket.emit("send-message", payload, () => {
				setIsMessageSending(false);
				onMessageSent();
			});
		},
		[onMessageSent]
	);

	return { isMessageSending, sendMessage };
};
