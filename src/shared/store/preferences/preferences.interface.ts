export enum Theme {
	INSOMNIA = "insomnia",
	WINTER = "winter",
	SYSTEM = "system"
}

interface IState {
	theme: Theme;
}

interface IActions {
	setTheme: (theme: Theme) => void;
}

export type IPreferencesStore = IState & IActions;
