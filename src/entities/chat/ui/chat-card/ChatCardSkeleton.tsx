import { FC } from "react";
import Skeleton from "react-loading-skeleton";

import styles from "./ChatCard.module.scss";

export const ChatCardSkeleton: FC<{ count?: number }> = ({ count = 1 }) => {
	const mockArray = Array(count).fill(0);

	return mockArray.map(() => (
		<div className={styles.card}>
			<div className={styles.image}>
				<Skeleton
					circle={true}
					width={40}
					height={40}
				/>
			</div>

			<div className={styles.info}>
				<div className={styles.top}>
					<div className={styles.title}>
						<Skeleton />
					</div>
				</div>

				<div className={styles.message}>
					<Skeleton width={150} />
				</div>
			</div>
		</div>
	));
};
