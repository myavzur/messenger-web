export type ITheme = "insomnia" | "winter";

interface IState {
	theme: ITheme;
}

interface IActions {
	setTheme: (theme: ITheme) => void;
	toggleTheme: () => void;
}

export type IPreferencesStore = IState & IActions;
