import { ElementType } from "react";

import { Logo } from "@/shared/ui";

import { IAuthFormLayoutProps } from "./AuthFormLayout.interface";
import styles from "./AuthFormLayout.module.scss";

export const AuthFormLayout = <E extends ElementType>({
	as,
	footerElement,
	children,
	...formProps
}: IAuthFormLayoutProps<E>) => {
	const TagName = as || "form";

	return (
		<div className={styles.form}>
			<div className={styles.header}>
				<Logo />
			</div>

			<TagName
				{...formProps}
				className={styles.content}
			>
				{children}
			</TagName>

			<div className={styles.footer}>{footerElement}</div>
		</div>
	);
};
