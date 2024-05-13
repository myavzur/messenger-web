import { PayloadAction } from "@reduxjs/toolkit";

export type ITheme = "insomnia" | "winter";

export type ILeftSidebarView =
	| "chats"
	| "profile"
	| "profile/edit"
	| "preferences"
	| null;

export type IRightSidebarView = "chat-info" | "chat-info/edit" | null;

export interface ISettingsState {
	theme: ITheme;
	leftSidebarView: ILeftSidebarView;
	rightSidebarView: IRightSidebarView;
}

export type ISetSidebarsContentAction = PayloadAction<{
	leftSidebarView?: ILeftSidebarView;
	rightSidebarView?: IRightSidebarView;
}>;
