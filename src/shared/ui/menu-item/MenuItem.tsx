import cn from "classnames";
import { FC } from "react";

import { IMenuItemProps } from "./MenuItem.interface";
import styles from "./MenuItem.module.scss";

export const MenuItem: FC<IMenuItemProps> = ({
	leftIconElement,
	children,
	isDangerous,
	...buttonProps
}) => {
	return (
		<li className={cn(styles.item, { [styles.item_dangerous]: isDangerous })}>
			<button
				{...buttonProps}
				className={styles.button}
			>
				<div className={styles.icon}>{leftIconElement}</div>
				<p className={styles.text}>{children}</p>
			</button>
		</li>
	);
};
