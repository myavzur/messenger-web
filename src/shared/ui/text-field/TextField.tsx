import cn from "classnames";
import { forwardRef } from "react";

import { ITextFieldProps } from "./TextField.interface";
import styles from "./TextField.module.scss";

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
	({ className, label, addonRightElement, ...inputProps }, ref) => {
		return (
			<div className={cn(styles.field, className)}>
				<input
					{...inputProps}
					id={`input${label}`}
					ref={ref}
					className={styles.input}
				/>

				{addonRightElement && (
					<div className={styles.addonRight}>{addonRightElement}</div>
				)}

				{label && (
					<label
						className={styles.label}
						htmlFor={`input${label}`}
					>
						{label}
					</label>
				)}
			</div>
		);
	}
);

TextField.displayName = "TextField";
