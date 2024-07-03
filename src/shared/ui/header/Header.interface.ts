import { ReactNode } from "react";

export interface IHeaderProps {
	onClick?: () => void;
	className?: string;
	children?: ReactNode;
}
