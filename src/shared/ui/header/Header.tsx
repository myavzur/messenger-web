import cn from "classnames";
import { FC } from "react";

import { IHeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";

export const Header: FC<IHeaderProps> = ({ children, className, onClick }) => {
	return (
		<header
			className={cn(styles.header, className)}
			onClick={onClick}
		>
			{children}
		</header>
	);
};
