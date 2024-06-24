import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IPreferencesStore } from "./preferences.interface";

export const usePreferencesStore = create<IPreferencesStore>()(
	persist(
		(set) => ({
			theme: "winter",
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set((state) => ({
					theme: state.theme === "insomnia" ? "winter" : "insomnia"
				}))
		}),
		{
			name: "preferences-storage",
			version: 1
		}
	)
);
