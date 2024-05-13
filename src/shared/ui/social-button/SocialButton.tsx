import React from "react";
import cn from "classnames";

import { ISocialButtonProps } from "./SocialButton.interface";
import styles from "./SocialButton.module.scss";

export const SocialButton: React.FC<ISocialButtonProps> = ({
	leftIconElement,
	children,
	className
}) => {
	return (
		<button className={cn(styles.social, className)}>
			{leftIconElement && (
				<div className={styles.social__icon}>{leftIconElement}</div>
			)}
			<p className={styles.social__text}>{children}</p>
		</button>
	);
};
