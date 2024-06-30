import cn from "classnames";
import { FC } from "react";

import { MessageSkeleton } from "@/entities/chat/ui/message";

import styles from "./MessageRow.module.scss";

export const MessageRowSkeleton: FC<{ count?: number }> = ({ count = 1 }) => {
	const mockArray = Array(count).fill(0);

	return mockArray.map((_, idx) => {
		const isOwn = idx % 2 === 0;

		return (
			<div
				key={idx}
				className={cn(styles.row, { [styles.row_own]: isOwn })}
			>
				<MessageSkeleton isOwn={isOwn} />
			</div>
		);
	});
};
