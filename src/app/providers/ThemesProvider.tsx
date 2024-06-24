import React, { useLayoutEffect } from "react";

import { usePreferencesStore } from "@/shared/store/preferences";

interface IAppThemeProps {
	children?: React.ReactNode;
}

export const ThemesProvider: React.FC<IAppThemeProps> = ({ children }) => {
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
