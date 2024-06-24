import cn from "classnames";
import React from "react";

import { IHeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: React.FC<IHeaderProps> = ({ children, className }) => {
	return <header className={cn(styles.header, className)}>{children}</header>;
};
