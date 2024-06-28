import cn from "classnames";
import { FC } from "react";

import { ISocialButtonProps } from "./SocialButton.interface";
import styles from "./SocialButton.module.scss";

export const SocialButton: FC<ISocialButtonProps> = ({
	leftIconElement,
	children,
	className,
	...buttonProps
}) => {
	return (
		<button
			{...buttonProps}
			className={cn(styles.social, className)}
		>
			{leftIconElement && (
				<div className={styles.social__icon}>{leftIconElement}</div>
			)}
			<p className={styles.social__text}>{children}</p>
		</button>
	);
};
