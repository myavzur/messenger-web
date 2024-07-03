import { ElementType, forwardRef } from "react";

import { PolymorphicRef } from "@/shared/interfaces";

import { IMenuProps } from "./Menu.interface";
import styles from "./Menu.module.scss";

export const Menu = forwardRef(
	<E extends ElementType>(
		{ as, children, ...menuProps }: IMenuProps<E>,
		ref: PolymorphicRef<E>
	) => {
		const Element = as || "div";

		return (
			<Element
				{...menuProps}
				ref={ref}
				className={styles.menu}
			>
				<ul className={styles.list}>{children}</ul>
			</Element>
		);
	}
);
