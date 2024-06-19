import cn from "classnames";
import React, { forwardRef, useState } from "react";

import { ITextFieldProps } from "./TextField.interface";
import styles from "./TextField.module.scss";

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
	(props, ref) => {
		const { className, label, ...inputProps } = props;
		const [hasValue, setHasValue] = useState(false);
		const [isFocused, setIsFocused] = useState(false);

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const hasValue = event.target.value.trim() !== "";
			if (hasValue) {
				return setHasValue(true);
			}
			setHasValue(false);
			inputProps.onChange?.(event);
		};

		const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
			setIsFocused(false);
			inputProps.onBlur?.(event);
		};

		return (
			<div
				className={cn(
					styles.field,
					{
						[styles["field_has-value"]]: hasValue,
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
					onBlur={handleBlur}
					onChange={handleChange}
				/>
			</div>
		);
	}
);

TextField.displayName = "TextField";
