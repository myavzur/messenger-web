import { useCallback, useState } from "react";

import { IMousePosition } from "../../interfaces";

export interface IUseContextMenuResult<T> {
	isContextMenuOpen: boolean;
	contextMenuData: T | null;
	mousePosition: IMousePosition | null;
	openContextMenu: (mousePosition: IMousePosition, newContextMenuData?: T) => void;
	closeContextMenu: () => void;
}

export const useContextMenu = <T>(): IUseContextMenuResult<T> => {
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuData, setContextMenuData] = useState<T | null>(null);
	const [mousePosition, setMousePosition] = useState<IMousePosition | null>(null);

	const openContextMenu = useCallback(
		(mousePosition: IMousePosition, newContextMenuData?: T) => {
			if (newContextMenuData) {
				setContextMenuData(newContextMenuData);
			}

			setMousePosition(mousePosition);
			setIsContextMenuOpen(true);
		},
		[]
	);

	const closeContextMenu = useCallback(() => {
		if (contextMenuData) {
			setContextMenuData(null);
		}

		setMousePosition(null);
		setIsContextMenuOpen(false);
	}, [contextMenuData]);

	return {
		isContextMenuOpen,
		contextMenuData,
		mousePosition,
		openContextMenu,
		closeContextMenu
	};
};
