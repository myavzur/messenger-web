import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { IPreferencesStore, Theme } from "./preferences.interface";

const STORAGE_PREFERENCES_KEY = "preferences";

export const usePreferencesStore = create<IPreferencesStore>()(
	devtools(
		persist(
			(set) => ({
				theme: Theme.SYSTEM,
				setTheme: (theme) => {
					return set({ theme }, false, "preferences/set-theme");
				}
			}),
			{
				name: STORAGE_PREFERENCES_KEY,
				version: 1
			}
		),
		{
			name: "preferences-store",
			enabled: import.meta.env.DEV,
			anonymousActionType: "unknown preferences action 🦊"
		}
	)
);
