import cn from "classnames";
import React, { useState } from "react";

import { getElementFromArrayByStringHash, getInitials } from "@/shared/lib/helpers";

import { IImageCircleProps } from "./ImageCircle.interface";
import styles from "./ImageCircle.module.scss";
import ImagePlaceholder from "./image-placeholder/ImagePlaceholder";

const fillColors = [
	"#E7320B",
	"#FF4D00",
	"#F55A50",
	"#DB7600",
	"#FFA300",
	"#5AA100",
	"#009B87",
	"#16AFCA",
	"#4856D1",
	"#E7289A",
	"#992BAE",
	"#577889"
];

export const ImageCircle: React.FC<IImageCircleProps> = ({
	placeholderText,
	src,
	className,
	...imageProps
}) => {
	const [isImageValid, setIsImageValid] = useState(false);

	const renderContent = () => {
		if (src && isImageValid) {
			return (
				<img
					{...imageProps}
					onError={() => setIsImageValid(false)}
				/>
			);
		}

		const fillColor = getElementFromArrayByStringHash(fillColors, placeholderText);
		const text = getInitials(placeholderText);

		return (
			<ImagePlaceholder
				fillColor={fillColor}
				text={text}
			/>
		);
	};

	return (
		<picture className={cn(styles.image, className)}>{renderContent()}</picture>
	);
};
