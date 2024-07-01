import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: string;
	leftIconElement: ReactNode;
	isDangerous?: boolean;
}
