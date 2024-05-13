import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IAttachment } from "@/entities/attachment/interfaces";

import { getAccessToken, setAccessToken } from "@/shared/lib/helpers";
import {
	IUser,
	IAuthorizationResponse,
	ILoginBody,
	IRegisterBody
} from "@/entities/user/interfaces";

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

enum ApiTags {
	USER = "user"
}

export const whisperFoxApi = createApi({
	tagTypes: [ApiTags.USER],
	reducerPath: "whisperFoxApi",
	baseQuery: fetchBaseQuery({
		baseUrl: API_SERVER_URL,
		prepareHeaders: (headers) => {
			const accessToken = getAccessToken();

			if (accessToken) {
				headers.set("Authorization", `Bearer ${accessToken}`);
			}

			headers.set("Content-Type", "application/json");
			return headers;
		}
	}),
	endpoints: (builder) => ({
		// * Auth
		getCurrentUser: builder.query<IUser, void>({
			query: () => "/auth/me",
			providesTags: [ApiTags.USER]
		}),

		login: builder.mutation<IAuthorizationResponse, ILoginBody>({
			query: (credential) => ({
				method: "POST",
				url: "/auth/login",
				body: credential
			}),
			transformResponse: (
				response: IAuthorizationResponse
			): IAuthorizationResponse => {
				if (response.access_token) {
					setAccessToken(response.access_token);
				}
				return response;
			},
			invalidatesTags: [ApiTags.USER]
		}),

		register: builder.mutation<IAuthorizationResponse, IRegisterBody>({
			query: (credential) => ({
				method: "POST",
				url: "/auth/register",
				body: credential
			}),
			transformResponse: (
				response: IAuthorizationResponse
			): IAuthorizationResponse => {
				if (response.access_token) {
					setAccessToken(response.access_token);
				}
				return response;
			},
			invalidatesTags: [ApiTags.USER]
		}),

		// * Users
		searchUsersByAccountName: builder.query<IUser[], IUser["account_name"]>({
			query: (account_name) => `/users/search?account_name=${account_name}`
		}),

		getUsersBasedOnLocalChats: builder.query<
			Pick<IUser, "id" | "account_name">[],
			void | null
		>({
			query: () => "/users/local-chats"
		}),

		getUserAvatars: builder.query<IAttachment[], IUser["id"]>({
			query: (userId) => `/users/${userId}/avatars`
		})
	})
});
