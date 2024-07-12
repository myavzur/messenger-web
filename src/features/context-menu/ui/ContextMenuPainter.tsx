import { FC, useEffect, useRef } from "react";

import { useClickOutside } from "@/shared/lib/hooks";

import { IContextMenuPainterProps } from "./ContextMenuPainter.interface";
import styles from "./ContextMenuPainter.module.scss";

export const ContextMenuPainter: FC<IContextMenuPainterProps> = ({
	containerElementRef,
	children,
	mousePosition,
	onClose
}) => {
	const menuElementRef = useRef<HTMLDivElement>(null);

	useClickOutside(menuElementRef, () => {
		onClose();
	});

	useEffect(() => {
		const menuElement = menuElementRef?.current;
		const containerElement = containerElementRef?.current;

		if (!menuElement || !containerElement) return;

		menuElement.style.setProperty("position", "absolute");
		containerElement.style.setProperty("position", "relative");

		if (!mousePosition) return;

		const menuRect = menuElement.getBoundingClientRect();
		const containerRect = containerElement.getBoundingClientRect();

		// Get mouse position inside of container.
		const mouseX = mousePosition.clientX - containerRect.left;
		const mouseY = mousePosition.clientY - containerRect.top;

		const freePixelsFromRight = Math.round(
			containerRect.width - menuRect.width - mouseX
		);
		const freePixelsFromBottom = Math.round(
			containerRect.height - menuRect.height - mouseY
		);

		let transform = "";
		if (freePixelsFromRight <= 0) {
			// Menu to the left of mouse position.
			transform += "translateX(-100%)";
		}
		if (freePixelsFromBottom <= 0) {
			// Menu to the top of mouse position.
			transform += "translateY(-100%)";
		}

		menuElement.style.setProperty("left", `${mouseX}px`);
		menuElement.style.setProperty("top", `${mouseY + containerElement.scrollTop}px`);
		menuElement.style.setProperty("transform", transform);

		return () => {
			containerElement.style.removeProperty("position");
		};
	}, [containerElementRef, mousePosition]);

	return (
		<div
			ref={menuElementRef}
			className={styles.painter}
		>
			{children}
		</div>
	);
};
