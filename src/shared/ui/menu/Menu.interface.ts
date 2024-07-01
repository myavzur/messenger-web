import { ComponentProps, ElementType, ReactNode } from "react";

interface IMenuOwnProps<E extends ElementType = ElementType> {
	as?: E;
	children: ReactNode;
}

export type IMenuProps<E extends ElementType> = IMenuOwnProps<E> &
	Omit<ComponentProps<E>, keyof IMenuOwnProps>;
