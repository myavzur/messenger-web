import { AxiosRequestConfig } from "axios";

import { getAccessToken } from "@/shared/lib/helpers";

export const getRequestHeaders = (): AxiosRequestConfig["headers"] => {
	const headers: AxiosRequestConfig["headers"] = {
		"Content-Type": "application/json"
	};

	const accessToken = getAccessToken();
	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	return headers;
};
