import { ReactNode, RefObject } from "react";

import { IMousePosition } from "../interfaces";

export interface IContextMenuPainterProps {
	containerElementRef: RefObject<HTMLElement>;
	children: ReactNode;
	onClose: () => void;
	/** If not present - simply render children with position absolute */
	mousePosition?: IMousePosition;
}
