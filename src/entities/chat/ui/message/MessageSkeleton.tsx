import cn from "classnames";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import { Icon } from "@/shared/ui";

import styles from "./Message.module.scss";

export const MessageSkeleton: FC<{ count?: number }> = ({ count = 1 }) => {
	const mockArray = Array(count).fill(0);

	return mockArray.map((_, idx) => {
		const isOwn = idx % 2 === 0;

		return (
			<div className={cn(styles.message, { [styles.message_own]: isOwn })}>
				{!isOwn && (
					<div className={styles.image}>
						<Skeleton
							circle={true}
							width={40}
							height={40}
						/>
					</div>
				)}

				<div className={styles.content}>
					<p className={cn(styles.row, styles.label)}>
						<Skeleton width={150} />
					</p>

					<p className={cn(styles.row, styles.text)}>
						<Skeleton width={150} />
						<Skeleton width={120} />
					</p>

					<div className={styles.appendix}>
						<Icon
							name="ui/appendix"
							width="15"
							height="15"
						/>
					</div>
				</div>
			</div>
		);
	});
};
