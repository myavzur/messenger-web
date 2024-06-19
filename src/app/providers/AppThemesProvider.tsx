import { usePreferencesStore } from "@/shared/store/preferences";
import React, { useLayoutEffect } from "react";

interface IAppThemeProps {
	children?: React.ReactNode;
}

export const AppThemesProvider: React.FC<IAppThemeProps> = ({ children }) => {
	const theme = usePreferencesStore((state) => state.theme);

	useLayoutEffect(() => {
		const bodyClassList = document.body.classList;

		// Delete all themes classes
		bodyClassList.forEach((className) => {
			if (className.startsWith("theme")) {
				bodyClassList.remove(className);
			}
		});

		bodyClassList.add(`theme_${theme}`);
	}, [theme]);

	return children;
};
