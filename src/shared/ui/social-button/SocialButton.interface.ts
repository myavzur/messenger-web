import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ISocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	leftIconElement: ReactNode;
	children: string;
	className?: string;
}
