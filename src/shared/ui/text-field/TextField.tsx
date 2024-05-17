import cn from "classnames";
import { forwardRef, useState } from "react";

import { ITextFieldProps } from "./TextField.interface";
import styles from "./TextField.module.scss";

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
	(props, ref) => {
		const { className, label, ...inputProps } = props;
		const [inputValue, setInputValue] = useState(inputProps.value);
		const [isFocused, setIsFocused] = useState(false);

		return (
			<div
				className={cn(
					styles.field,
					{
						[styles["field_has-value"]]:
							typeof inputValue === "string" && inputValue.trim() !== "",
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
					onChange={(e) => setInputValue(e.target.value)}
				/>
			</div>
		);
	}
);

TextField.displayName = "TextField";
