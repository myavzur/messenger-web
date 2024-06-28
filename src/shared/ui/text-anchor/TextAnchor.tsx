import cn from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

import { ITextAnchorProps } from "./TextAnchor.interface";
import styles from "./TextAnchor.module.scss";

export const TextAnchor: FC<ITextAnchorProps> = ({
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
