import { FC } from "react";

import { useActiveChatStore } from "@/entities/chat/stores/active-chat";

import useCopy from "@/shared/lib/hooks/use-copy";
import { Icon, Menu, MenuItem } from "@/shared/ui";

import { IMessageMenuProps } from "./MessageMenu.interface";

export const MessageMenu: FC<IMessageMenuProps> = ({ message }) => {
	const [isCopied, copyToClipboard, setIsCopied] = useCopy();

	const setReplyFor = useActiveChatStore((state) => state.setReplyFor);

	const handleCopy = async () => {
		if (isCopied) return;
		await copyToClipboard(message.text as string);
		setTimeout(() => {
			setIsCopied(false);
		}, 500);
	};

	return (
		<Menu as="div">
			<MenuItem
				leftIconElement={<Icon name="controls/reply" />}
				onClick={() => setReplyFor(message)}
				aria-label="Reply on message"
			>
				Reply
			</MenuItem>

			{message.text && (
				<MenuItem
					leftIconElement={<Icon name="controls/copy" />}
					onClick={handleCopy}
					aria-label="Copy message text"
				>
					{isCopied ? "Copied!" : "Copy"}
				</MenuItem>
			)}

			<MenuItem
				isDangerous={true}
				leftIconElement={<Icon name="controls/trash-bin" />}
				onClick={() => alert("Copy")}
				aria-label="Delete message"
			>
				Delete
			</MenuItem>
		</Menu>
	);
};
