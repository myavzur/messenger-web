import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss";

export const AuthLayout: FC = () => {
	return (
		<div className={styles.page}>
			<Outlet />
		</div>
	);
};
