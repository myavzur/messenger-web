import { IUser, UserTheme } from "@/entities/user/interfaces";

export interface ILoginBody {
	email: string;
	password: string;
}

export interface IRegisterBody {
	email: string;
	password: string;
	account_name: string;
	theme: UserTheme;
}

export type IRegisterCredentialsBody = Pick<IRegisterBody, "email" | "password">;
export type IRegisterPersonalizeBody = Pick<IRegisterBody, "account_name" | "theme">;

export interface IAuthorizationResponse {
	user: IUser;
	access_token: string;
}
