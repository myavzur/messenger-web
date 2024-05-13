import { IUser } from "./user.interface";

export interface ILoginBody {
	email: string;
	password: string;
}

export interface IRegisterBody {
	email: string;
	account_name: string;
	password: string;
	password_confirmation: string;
}

export interface IAuthorizationResponse {
	user: IUser;
	access_token: string;
}
