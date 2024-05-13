import React from "react";
import cn from "classnames";

import { ITextAnchorProps } from "./TextAnchor.interface";
import { Link } from "react-router-dom";

import styles from "./TextAnchor.module.scss";

export const TextAnchor: React.FC<ITextAnchorProps> = ({
	className,
	children,
	path,
	isCentered
}) => {
	return (
		<span
			className={cn(styles.anchor, className, {
				[styles.anchor_centered]: isCentered
			})}
		>
			<Link to={path}>{children}</Link>
		</span>
	);
};
