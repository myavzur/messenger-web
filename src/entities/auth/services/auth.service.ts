import axios, { AxiosRequestConfig } from "axios";

import { IUser } from "@/entities/user/interfaces";

import { QueryKey, queryClient } from "@/shared/api/query-client";

import { IAuthorizationResponse, ILoginBody, IRegisterBody } from "../interfaces";

class AuthService {
	private URL = import.meta.env.VITE_API_SERVER_URL + "/auth";
	private STORAGE_TOKEN_KEY = "access-token";

	private getRequestHeaders = (): AxiosRequestConfig["headers"] => {
		const headers: AxiosRequestConfig["headers"] = {
			"Content-Type": "application/json"
		};

		const accessToken = localStorage.getItem(this.STORAGE_TOKEN_KEY);
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		return headers;
	};

	getAccessToken = () => {
		return localStorage.getItem(this.STORAGE_TOKEN_KEY);
	};

	authorize = async () => {
		return axios.get<IUser>(`${this.URL}/me`, {
			headers: this.getRequestHeaders()
		});
	};

	login = async (credentials: ILoginBody) => {
		const response = await axios.post<IAuthorizationResponse>(
			`${this.URL}/login`,
			credentials,
			{
				headers: this.getRequestHeaders()
			}
		);

		localStorage.setItem(this.STORAGE_TOKEN_KEY, response.data.access_token);

		return response;
	};

	register = async (credentials: IRegisterBody) => {
		const response = await axios.post<IAuthorizationResponse>(
			`${this.URL}/register`,
			credentials,
			{
				headers: this.getRequestHeaders()
			}
		);

		localStorage.setItem(this.STORAGE_TOKEN_KEY, response.data.access_token);

		return response;
	};

	/** Simply clears token from localStorage */
	logout = () => {
		localStorage.removeItem(this.STORAGE_TOKEN_KEY);
		queryClient.invalidateQueries({ queryKey: [QueryKey.AUTHORIZE] });
	};
}

export default new AuthService();
