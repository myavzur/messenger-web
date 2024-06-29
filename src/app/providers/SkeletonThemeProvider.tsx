import { FC, PropsWithChildren } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

export const SkeletonThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<SkeletonTheme
			baseColor="#313131"
			highlightColor="#525252"
		>
			{children}
		</SkeletonTheme>
	);
};
