import axios, { AxiosRequestConfig } from "axios";
import { io } from "socket.io-client";

import { IUser } from "@/entities/user/interfaces";

import { QueryKey, queryClient } from "@/shared/api/query-client";

import { IAuthorizationResponse, ILoginBody, IRegisterBody } from "../interfaces";
import { IChatSocket, IPresenceSocket } from "../interfaces/socket-io";

class AuthService {
	private STORAGE_TOKEN_KEY = "access-token";

	private API_URL = import.meta.env.VITE_API_SERVER_URL + "/auth";
	private CHAT_SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL;
	private PRESENCE_SERVER_URL = import.meta.env.VITE_PRESENCE_SERVER_URL;

	public chatSocket: IChatSocket;
	public presenceSocket: IPresenceSocket;

	constructor() {
		console.log("AuthService constructor");

		this.chatSocket = io(this.CHAT_SERVER_URL, {
			extraHeaders: {
				Authorization: `Bearer ${this.getAccessToken()}`
			}
		});

		this.presenceSocket = io(this.PRESENCE_SERVER_URL, {
			extraHeaders: {
				Authorization: `Bearer ${this.getAccessToken()}`
			}
		});
	}

	private getAccessToken = () => {
		return localStorage.getItem(this.STORAGE_TOKEN_KEY);
	};

	private setAccessToken = (accessToken: string) => {
		localStorage.setItem(this.STORAGE_TOKEN_KEY, accessToken);
	};

	private removeAccessToken = () => {
		return localStorage.removeItem(this.STORAGE_TOKEN_KEY);
	};

	private getRequestHeaders = (): AxiosRequestConfig["headers"] => {
		const headers: AxiosRequestConfig["headers"] = {
			"Content-Type": "application/json"
		};

		const accessToken = this.getAccessToken();
		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`;
		}

		return headers;
	};

	private connectSockets = () => {
		this.chatSocket.connect();
		this.presenceSocket.connect();
	};

	private disconnectSockets = () => {
		this.chatSocket.disconnect();
		this.presenceSocket.disconnect();
	};

	authorize = async () => {
		return axios.get<IUser>(`${this.API_URL}/me`, {
			headers: this.getRequestHeaders()
		});
	};

	login = async (credentials: ILoginBody) => {
		const response = await axios.post<IAuthorizationResponse>(
			`${this.API_URL}/login`,
			credentials,
			{
				headers: this.getRequestHeaders()
			}
		);

		this.setAccessToken(response.data.access_token);
		this.connectSockets();

		return response;
	};

	register = async (credentials: IRegisterBody) => {
		const response = await axios.post<IAuthorizationResponse>(
			`${this.API_URL}/register`,
			credentials,
			{
				headers: this.getRequestHeaders()
			}
		);

		this.setAccessToken(response.data.access_token);
		this.connectSockets();

		return response;
	};

	/**
	 * 1. Clears token from LS.
	 * 2. Disconnects all sockets.
	 * 3. Invalidates authorize query. */
	logout = () => {
		this.removeAccessToken();
		this.disconnectSockets();
		queryClient.invalidateQueries({ queryKey: [QueryKey.AUTHORIZE] });
	};
}

export default new AuthService();
