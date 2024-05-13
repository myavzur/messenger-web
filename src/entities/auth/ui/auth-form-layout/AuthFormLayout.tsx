import React from "react";

import { IAuthFormLayoutProps } from "./AuthFormLayout.interface";
import styles from "./AuthFormLayout.module.scss";
import { Logo } from "@/shared/ui";

export const AuthFormLayout: React.FC<IAuthFormLayoutProps> = ({
	onSubmit,
	children,
	footerElement
}) => {
	const hasOnSubmit = typeof onSubmit === "function";

	return (
		<div className={styles.form}>
			<div className={styles.form__header}>
				<Logo />
			</div>

			{hasOnSubmit ? (
				<form
					onSubmit={onSubmit}
					className={styles.form__content}
				>
					{children}
				</form>
			) : (
				<div className={styles.form__content}>{children}</div>
			)}

			<div className={styles.form__footer}>{footerElement}</div>
		</div>
	);
};