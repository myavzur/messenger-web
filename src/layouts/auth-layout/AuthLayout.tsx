import { FC, PropsWithChildren } from "react";

import styles from "./AuthLayout.module.scss";

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.page}>{children}</div>;
};
