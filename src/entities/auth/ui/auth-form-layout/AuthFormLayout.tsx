import React from "react";

import { Logo } from "@/shared/ui";

import { IAuthFormLayoutProps } from "./AuthFormLayout.interface";
import styles from "./AuthFormLayout.module.scss";

/** Может рендерить как элемент <form> так и <div>.
 * Обуславливается тем, что при логине у нас простая форма, а на регистрации - мультистеп */
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
