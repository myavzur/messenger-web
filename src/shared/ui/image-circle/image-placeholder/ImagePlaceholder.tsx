import React from "react";

import { IImagePlaceholderProps } from "./ImagePlaceholder.interface";

const ImagePlaceholder: React.FC<IImagePlaceholderProps> = ({ fillColor, text }) => {
	return (
		<svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
		>
			<rect
				width="100%"
				height="100%"
				fill={fillColor}
			/>

			<text
				x="50%"
				y="50%"
				dominantBaseline="mathematical"
				textAnchor="middle"
				fill="#FFF"
				style={{ fontSize: "150%", userSelect: "none" }}
			>
				{text}
			</text>
		</svg>
	);
};

export default ImagePlaceholder;
