import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { API_SERVER_URL } from "@/shared/constants/environment";
import { setAccessToken } from "@/shared/lib/helpers";

import { IAuthorizationResponse, ILoginBody } from "../../interfaces";
import { getRequestHeaders } from "../helpers/get-request-headers";

const performLoginRequest = async (credentials: ILoginBody) => {
	const response = await axios.post<IAuthorizationResponse>(
		`${API_SERVER_URL}/auth/login`,
		credentials,
		{
			headers: getRequestHeaders()
		}
	);

	setAccessToken(response.data.access_token);

	return response;
};

export const useLoginMutation = () => {
	return useMutation({
		mutationKey: ["login"],
		mutationFn: performLoginRequest
	});
};
