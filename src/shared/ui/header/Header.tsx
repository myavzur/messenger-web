import cn from "classnames";
import { FC } from "react";

import { IHeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: FC<IHeaderProps> = ({ children, className }) => {
	return <header className={cn(styles.header, className)}>{children}</header>;
};
