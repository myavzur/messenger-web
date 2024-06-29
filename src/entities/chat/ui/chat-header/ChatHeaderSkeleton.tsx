import Skeleton from "react-loading-skeleton";

import { Header } from "@/shared/ui";

import styles from "./ChatHeader.module.scss";

export const ChatHeaderSkeleton = () => {
	return (
		<Header>
			<div className={styles.content}>
				<div className={styles.image}>
					<Skeleton
						circle={true}
						width={40}
						height={40}
					/>
				</div>

				<p className={styles.title}>
					<Skeleton width={150} />
				</p>

				<p className={styles.info}>
					<Skeleton width={100} />
				</p>
			</div>
		</Header>
	);
};
