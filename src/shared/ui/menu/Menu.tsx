import { ElementType } from "react";

import { IMenuProps } from "./Menu.interface";
import styles from "./Menu.module.scss";

export const Menu = <E extends ElementType>({
	as,
	children,
	...menuProps
}: IMenuProps<E>) => {
	const TagName = as || "div";

	return (
		<TagName
			{...menuProps}
			className={styles.menu}
		>
			<ul className={styles.list}>{children}</ul>
		</TagName>
	);
};
