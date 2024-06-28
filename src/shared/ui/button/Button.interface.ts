import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: string;
	leftIconElement?: ReactNode;
	kind?: "silent";
}
