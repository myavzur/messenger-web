import { FC, memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSendMessageEvent } from "@/entities/chat/lib/hooks";

import { useWindowEvent } from "@/shared/lib/hooks";
import { TextField } from "@/shared/ui";

import { ISendMessageFormProps } from "./SendMessageForm.interface";

export const SendMessageForm: FC<ISendMessageFormProps> = memo(({ chat }) => {
	const { register, handleSubmit, reset, formState } = useForm<{ text: string }>({
		mode: "onChange"
	});

	const { isMessageSending, sendMessage } = useSendMessageEvent({
		onMessageSent: reset
	});

	const handleSendMessage: SubmitHandler<{ text: string }> = (data) => {
		if (!formState.isValid || isMessageSending) return;

		sendMessage({
			polymorphicId: chat.id,
			text: data.text
		});
	};

	useWindowEvent("keydown", (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(handleSendMessage)();
		}
	});

	return (
		<div>
			<form onSubmit={handleSubmit(handleSendMessage)}>
				<TextField
					{...register("text", {
						minLength: 1,
						required: false
					})}
					placeholder="You are beautiful ✨"
					disabled={isMessageSending}
				/>
			</form>
		</div>
	);
});
