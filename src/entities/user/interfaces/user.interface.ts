import { IAttachment } from "@/entities/attachment/interfaces";

export enum UserStatus {
	OFFLINE,
	ONLINE
}

export enum UserTheme {
	SOFT_CORAL = "soft-coral",
	SUNSET_ORANGE = "sunset-orange",
	LAVENDER_PURPLE = "lavender-purple",
	FRESH_LIME = "fresh-lime",
	AQUA_MARINE = "aqua-marine",
	SKY_BLUE = "sky-blue",
	PINK_ORCHID = "pink-orchid"
}

export const userThemeDictionary = {
	[UserTheme.SOFT_CORAL]: "Soft Coral",
	[UserTheme.SUNSET_ORANGE]: "Sunset Orange",
	[UserTheme.LAVENDER_PURPLE]: "Lavender Purple",
	[UserTheme.FRESH_LIME]: "Fresh Lime",
	[UserTheme.AQUA_MARINE]: "Aqua Marine",
	[UserTheme.SKY_BLUE]: "Sky Blue",
	[UserTheme.PINK_ORCHID]: "Pink Orchid"
};

export interface IUser {
	id: string;
	created_at: Date;
	last_seen_at: Date;
	account_name: string;
	email?: string;
	avatar?: IAttachment;
	theme: UserTheme;
}
