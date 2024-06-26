import cn from "classnames";
import { FC } from "react";

import { IIconProps } from "./Icon.interface";
import styles from "./Icon.module.scss";
import sprite from "./assets/sprite.svg";

export const Icon: FC<IIconProps> = ({
	name,
	isMirrored,
	className,
	width,
	height,
	onClick
}) => {
	return (
		<svg
			width={width || "100%"}
			height={height || "100%"}
			className={cn(className, {
				[styles.mirrored]: isMirrored
			})}
			onClick={onClick}
		>
			<use href={sprite + `#${name}`} />
		</svg>
	);
};
