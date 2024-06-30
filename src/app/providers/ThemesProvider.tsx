import { FC, PropsWithChildren, useCallback, useLayoutEffect } from "react";

import { getThemeFromSystem } from "@/shared/lib/helpers";
import { usePreferencesStore } from "@/shared/stores/preferences";
import { Theme } from "@/shared/stores/preferences/preferences.interface";

export const ThemesProvider: FC<PropsWithChildren> = ({ children }) => {
	const theme = usePreferencesStore((state) => state.theme);

	const updateBodyClasses = useCallback((theme: Theme) => {
		const bodyClassList = document.body.classList;

		// Delete all themes classes
		bodyClassList.forEach((className) => {
			if (className.startsWith("theme")) {
				bodyClassList.remove(className);
			}
		});

		bodyClassList.add(`theme_${theme}`);
	}, []);

	const handleSystemThemeChange = useCallback(
		(event: MediaQueryListEvent) => {
			if (theme !== Theme.SYSTEM) return;
			updateBodyClasses(event.matches ? Theme.INSOMNIA : Theme.WINTER);
		},
		[theme, updateBodyClasses]
	);

	useLayoutEffect(() => {
		const systemTheme = getThemeFromSystem();

		if (theme === Theme.SYSTEM) {
			updateBodyClasses(systemTheme);
		} else {
			updateBodyClasses(theme);
		}

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", handleSystemThemeChange);

		return () => {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.removeEventListener("change", handleSystemThemeChange);
		};
	}, [theme, handleSystemThemeChange, updateBodyClasses]);

	return children;
};
