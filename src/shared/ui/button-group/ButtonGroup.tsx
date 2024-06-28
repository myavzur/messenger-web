import cn from "classnames";
import { FC } from "react";

import { IButtonGroupProps } from "./ButtonGroup.interface";
import styles from "./ButtonGroup.module.scss";

export const ButtonGroup: FC<IButtonGroupProps> = ({
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
