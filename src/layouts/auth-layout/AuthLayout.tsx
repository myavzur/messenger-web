import React from "react";

import { IAuthLayoutProps } from "./AuthLayout.interface";
import styles from "./AuthLayout.module.scss";

export const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
	return <div className={styles.page}>{children}</div>;
};
