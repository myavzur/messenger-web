import { forwardRef, useState } from "react";
import cn from "classnames";

import styles from "./TextField.module.scss";

import { ITextFieldProps } from "./TextField.interface";

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
	(props, ref) => {
		const { className, label, ...inputProps } = props;
		const [isFocused, setIsFocused] = useState(false);

		return (
			<div
				className={cn(
					styles.field,
					{
						[styles["field_has-value"]]: inputProps.value,
						[styles["field_active"]]: isFocused
					},
					className
				)}
			>
				{label && <label className={styles.field__label}>{label}</label>}

				<input
					{...inputProps}
					ref={ref}
					className={styles.field__content}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
			</div>
		);
	}
);

TextField.displayName = "TextField";
