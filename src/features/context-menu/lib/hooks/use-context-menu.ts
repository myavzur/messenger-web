import { useCallback, useState } from "react";

import { IMousePosition } from "../../interfaces";

export interface IUseContextMenuResult<T> {
	isContextMenuOpen: boolean;
	contextMenuData: T | null;
	mousePosition: IMousePosition | null;
	openContextMenu: (data: { data: T; mousePosition: IMousePosition }) => void;
	closeContextMenu: () => void;
}

export const useContextMenu = <T>(): IUseContextMenuResult<T> => {
	const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
	const [contextMenuData, setContextMenuData] = useState<T | null>(null);
	const [mousePosition, setMousePosition] = useState<IMousePosition | null>(null);

	const openContextMenu = useCallback(
		(data: { data: T; mousePosition: IMousePosition }) => {
			setContextMenuData(data.data);
			setMousePosition(data.mousePosition);
			setIsContextMenuOpen(true);
		},
		[]
	);

	const closeContextMenu = useCallback(() => {
		setContextMenuData(null);
		setMousePosition(null);
		setIsContextMenuOpen(false);
	}, []);

	return {
		isContextMenuOpen,
		contextMenuData,
		mousePosition,
		openContextMenu,
		closeContextMenu
	};
};
