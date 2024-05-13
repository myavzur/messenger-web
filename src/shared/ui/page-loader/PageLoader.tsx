import React from "react";

import { IPageLoaderProps } from "./PageLoader.interface";
import styles from "./PageLoader.module.scss";

export const PageLoader: React.FC<IPageLoaderProps> = ({ captureText }) => {
	return (
		<div className={styles.page}>
			<div className={styles.page__content}>
				<span className={styles.loader}></span>
				<div className={styles.capture}>{captureText}</div>
			</div>
		</div>
	);
};
