import { InputHTMLAttributes } from "react";

export interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
	label?: string;
	addonRightElement?: React.ReactNode;
	shouldPreventTopBorder?: boolean;
}
