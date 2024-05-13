import React from "react";

import { IButtonGroupProps } from "./ButtonGroup.interface";
import styles from "./ButtonGroup.module.scss";
import cn from "classnames";

export const ButtonGroup: React.FC<IButtonGroupProps> = ({
	children,
	className,
	gridType
}) => {
	return (
		<ul
			className={cn(styles.group, className, {
				[styles[`group_${gridType}`]]: Boolean(gridType)
			})}
		>
			{children}
		</ul>
	);
};
