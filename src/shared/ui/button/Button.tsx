import cn from "classnames";
import { forwardRef } from "react";

import { useRippleElements } from "@/shared/lib/hooks";

import { IButtonProps } from "./Button.interface";
import styles from "./Button.module.scss";

export const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
	const {
		leftIconElement,
		kind,
		className,
		children,
		type = "button",
		...buttonProps
	} = props;

	const { addRippleElement, rippleElements } = useRippleElements({
		className: styles.button__ripple,
		maxRippleElements: 5
	});

	return (
		<button
			{...buttonProps}
			ref={ref}
			type={type}
			onClick={(event) => {
				buttonProps?.onClick?.(event);
				addRippleElement(event);
			}}
			className={cn(styles.button, className, {
				[styles["button_squared"]]: leftIconElement && !children,
				[styles[`button_kind-${kind}`]]: Boolean(kind)
			})}
		>
			{leftIconElement && (
				<div className={styles.button__icon}>{leftIconElement}</div>
			)}

			{children && <p className={styles.button__text}>{children}</p>}

			{rippleElements}
		</button>
	);
});
