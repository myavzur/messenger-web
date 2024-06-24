import cn from "classnames";
import React from "react";

import { ISidebarHeaderProps } from "./SidebarHeader.interface";
import styles from "./SidebarHeader.module.scss";

export const SidebarHeader: React.FC<ISidebarHeaderProps> = ({
	children,
	className
}) => {
	return <header className={cn(styles.header, className)}>{children}</header>;
};
