import React from "react";

import { IMainLayoutProps } from "./MainLayout.interface";
import styles from "./MainLayout.module.scss";

export const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.inner}>{children}</div>
		</div>
	);
};
