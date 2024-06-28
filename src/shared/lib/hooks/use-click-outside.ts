import { RefObject, useEffect } from "react";

import { useEvent } from "./use-event";

export const useClickOutside = (
	elementRef: RefObject<HTMLElement>,
	onClickOutside: (event: MouseEvent | TouchEvent) => void
) => {
	const clickOutsideHandler = useEvent(onClickOutside);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (!elementRef.current) return;

			if (
				event.target instanceof Node &&
				!elementRef.current.contains(event.target)
			) {
				clickOutsideHandler(event);
			}
		};

		document.addEventListener("mousedown", handleClickOutside, true);
		document.addEventListener("touchstart", handleClickOutside, true);
		document.addEventListener("contextmenu", handleClickOutside, true);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside, true);
			document.removeEventListener("touchstart", handleClickOutside, true);
			document.removeEventListener("contextmenu", handleClickOutside, true);
		};
	}, [elementRef, clickOutsideHandler]);
};
