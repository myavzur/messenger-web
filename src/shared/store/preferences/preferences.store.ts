import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IPreferencesStore, Theme } from "./preferences.interface";

const STORAGE_PREFERENCES_KEY = "preferences";

export const usePreferencesStore = create<IPreferencesStore>()(
	persist(
		(set) => ({
			theme: Theme.SYSTEM,
			setTheme: (theme) => set({ theme })
		}),
		{
			name: STORAGE_PREFERENCES_KEY,
			version: 1
		}
	)
);
