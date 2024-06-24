import { ComponentProps, ElementType, ReactNode } from "react";

interface IAuthFormLayoutOwnProps<E extends ElementType = ElementType> {
	as?: E;
	footerElement?: ReactNode;
}

export type IAuthFormLayoutProps<E extends ElementType> =
	IAuthFormLayoutOwnProps<E> &
		Omit<ComponentProps<E>, keyof IAuthFormLayoutOwnProps>;
