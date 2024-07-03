import { FC } from "react";

import { Icon, Menu, MenuItem } from "@/shared/ui";

import { IMessageMenuProps } from "./MessageMenu.interface";

export const MessageMenu: FC<IMessageMenuProps> = () => {
	return (
		<Menu as="div">
			<MenuItem
				leftIconElement={<Icon name="controls/reply" />}
				onClick={() => alert("Copy")}
				aria-label="Reply on message"
			>
				Reply
			</MenuItem>

			<MenuItem
				leftIconElement={<Icon name="controls/edit" />}
				onClick={() => alert("Copy")}
				aria-label="Edit message"
			>
				Edit
			</MenuItem>

			<MenuItem
				leftIconElement={<Icon name="controls/copy" />}
				onClick={() => alert("Copy")}
				aria-label="Copy message text"
			>
				Copy
			</MenuItem>

			<MenuItem
				leftIconElement={<Icon name="controls/pin" />}
				onClick={() => alert("Copy")}
				aria-label="Pin message in chat"
			>
				Pin
			</MenuItem>

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
