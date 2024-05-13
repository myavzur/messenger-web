import cn from "classnames";
import React from "react";

import { IDividerProps } from "./Divider.interface";
import styles from "./Divider.module.scss";

export const Divider: React.FC<IDividerProps> = ({ children, className }) => {
	return (
		<div className={cn(styles.divider, className)}>
			<div className={styles.divider__overlay}></div>

			<div className={styles.divider__bar}></div>
			<p className={styles.divider__text}>{children}</p>
			<div className={styles.divider__bar}></div>
		</div>
	);
};
