import { FC, memo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useSendMessageEvent } from "@/entities/chat/lib/hooks";
import { useActiveChatStore } from "@/entities/chat/stores/active-chat";

import { useEvent, useWindowEvent } from "@/shared/lib/hooks";
import { Button, Icon, MessageEmbedded, TextField } from "@/shared/ui";

import { ISendMessageFormProps } from "./SendMessageForm.interface";
import styles from "./SendMessageForm.module.scss";

export const SendMessageForm: FC<ISendMessageFormProps> = memo(({ chat }) => {
	const replyFor = useActiveChatStore((state) => state.replyFor);
	const setReplyFor = useActiveChatStore((state) => state.setReplyFor);

	const { register, handleSubmit, reset, formState, getValues } = useForm<{
		text: string;
	}>({
		mode: "onChange"
	});

	const resetForm = useEvent(() => {
		reset();
		setReplyFor(null);
	});

	const { isMessageSending, sendMessage } = useSendMessageEvent({
		onMessageSent: resetForm
	});

	const handleSendMessage: SubmitHandler<{ text: string }> = (data) => {
		if (!formState.isValid || isMessageSending) return;

		sendMessage({
			polymorphicId: chat.id,
			text: data.text,
			replyForId: replyFor?.id
		});
	};

	useWindowEvent("keydown", (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage(getValues());
		}
	});

	return (
		<form
			onSubmit={handleSubmit(handleSendMessage)}
			className={styles.form}
		>
			{replyFor && (
				<div className={styles.reply}>
					<MessageEmbedded message={replyFor} />

					<div className={styles.controls}>
						<Button
							leftIconElement={<Icon name="controls/close" />}
							onClick={() => setReplyFor(null)}
						/>
					</div>
				</div>
			)}

			<TextField
				{...register("text", {
					minLength: 1,
					required: false
				})}
				placeholder="You are beautiful ✨"
				disabled={isMessageSending}
				shouldPreventTopBorder={Boolean(replyFor)}
			/>
		</form>
	);
});
