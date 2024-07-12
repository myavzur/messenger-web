import { RefObject } from "react";

export interface INavigationMenuProps {
	onClose: () => void;
	containerElementRef: RefObject<HTMLElement>;
}
